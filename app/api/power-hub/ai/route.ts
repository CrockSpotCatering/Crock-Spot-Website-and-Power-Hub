import { NextResponse } from 'next/server';

// API keys are stored securely in Vercel Environment Variables
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// GET: Check which API keys are configured
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    claudeConfigured: !!CLAUDE_API_KEY,
    openaiConfigured: !!OPENAI_API_KEY,
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { prompt, content, apiKey: clientApiKey, provider, brandContext } = await request.json();

    if (!content || !prompt) {
      return NextResponse.json(
        { error: 'Content and prompt are required' },
        { status: 400 }
      );
    }

    // Use environment variable first, fall back to client-provided key
    const apiKey = provider === 'openai'
      ? (OPENAI_API_KEY || clientApiKey)
      : (CLAUDE_API_KEY || clientApiKey);

    if (!apiKey) {
      return NextResponse.json(
        { error: `No ${provider === 'openai' ? 'OpenAI' : 'Claude'} API key configured. Please add ${provider === 'openai' ? 'OPENAI_API_KEY' : 'CLAUDE_API_KEY'} to Vercel Environment Variables.` },
        { status: 400 }
      );
    }

    // Build system prompt with optional brand context
    let systemPrompt = `You are a helpful AI assistant for The Crock Spot, a Denver-based gourmet food truck catering company. You help users improve, edit, and create website content. Be concise and practical. Output only the improved content without explanations unless asked.`;

    if (brandContext) {
      systemPrompt += `\n\nBrand Guidelines:\n${brandContext}`;
    }

    const userMessage = `${prompt}\n\nContent to work with:\n${content}`;

    let result: string;

    if (provider === 'openai') {
      // Call OpenAI ChatGPT API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          max_tokens: 2048,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `OpenAI API error: ${response.status}`;
        return NextResponse.json({ error: errorMessage }, { status: response.status });
      }

      const data = await response.json();
      result = data.choices?.[0]?.message?.content || 'No response generated';

    } else {
      // Default to Claude (Anthropic API)
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          system: systemPrompt,
          messages: [
            { role: 'user', content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `Claude API error: ${response.status}`;
        return NextResponse.json({ error: errorMessage }, { status: response.status });
      }

      const data = await response.json();
      result = data.content?.[0]?.text || 'No response generated';
    }

    return NextResponse.json({ result });

  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}
