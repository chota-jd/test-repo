import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const FALLBACK_MODEL = "google/gemma-4-31b-it:free";
const MAX_RETRIES = 2;

async function callOpenRouter({
  apiKey,
  model,
  role,
  challenge,
  prompt,
}: {
  apiKey: string;
  model: string;
  role: string;
  challenge: string;
  prompt: string;
}) {
  const upstream = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
      "X-Title": "AI Director Challenge",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant focused on practical, reliable, and concise outputs for everyday workflows.",
        },
        {
          role: "user",
          content: `User role: ${role}\nChallenge: ${challenge}\n\nTask:\n${prompt}`,
        },
      ],
    }),
  });

  const data = await upstream.json();
  return { upstream, data };
}

function shouldRetry(status: number, message?: string) {
  if (status === 429 || status >= 500) return true;
  if (!message) return false;
  const normalized = message.toLowerCase();
  return (
    normalized.includes("provider returned error") ||
    normalized.includes("temporarily unavailable") ||
    normalized.includes("overloaded") ||
    normalized.includes("timeout")
  );
}

async function callWithRetry({
  apiKey,
  model,
  role,
  challenge,
  prompt,
}: {
  apiKey: string;
  model: string;
  role: string;
  challenge: string;
  prompt: string;
}) {
  let lastCall = await callOpenRouter({ apiKey, model, role, challenge, prompt });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    const message = lastCall.data?.error?.message;
    if (lastCall.upstream.ok || !shouldRetry(lastCall.upstream.status, message)) {
      return lastCall;
    }

    await new Promise((resolve) => setTimeout(resolve, 450 * attempt));
    lastCall = await callOpenRouter({ apiKey, model, role, challenge, prompt });
  }

  return lastCall;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENROUTER_API_KEY in environment variables." },
        { status: 500 },
      );
    }

    const body = await req.json();
    const model = body?.model;
    const prompt = body?.prompt;
    const role = body?.context?.role || "user";
    const challenge = body?.context?.challenge || "";

    if (!model || !prompt) {
      return NextResponse.json({ error: "Both model and prompt are required." }, { status: 400 });
    }

    const primaryCall = await callWithRetry({
      apiKey,
      model,
      role,
      challenge,
      prompt,
    });

    if (!primaryCall.upstream.ok && model !== FALLBACK_MODEL) {
      const fallbackCall = await callWithRetry({
        apiKey,
        model: FALLBACK_MODEL,
        role,
        challenge,
        prompt,
      });

      if (fallbackCall.upstream.ok) {
        const fallbackOutput = fallbackCall.data?.choices?.[0]?.message?.content || "";
        return NextResponse.json({ output: fallbackOutput, modelUsed: FALLBACK_MODEL });
      }
    }

    if (!primaryCall.upstream.ok) {
      const message = primaryCall.data?.error?.message || "OpenRouter request failed.";
      const friendlyMessage =
        primaryCall.upstream.status === 429 ||
        message.toLowerCase().includes("provider returned error")
          ? `OpenRouter free model is temporarily busy. Please retry in 30-60 seconds or switch model. (${message})`
          : message;
      return NextResponse.json(
        { error: `${friendlyMessage} (model: ${model})` },
        { status: primaryCall.upstream.status },
      );
    }

    const output = primaryCall.data?.choices?.[0]?.message?.content || "";
    return NextResponse.json({ output, modelUsed: model });
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
