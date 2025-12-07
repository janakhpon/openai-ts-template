import { openai } from './services/openaiClient.js';

async function main(): Promise<void> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Hello from pnpm project!' }],
    });

    if (response.usage) {
      const { prompt_tokens, completion_tokens, total_tokens } = response.usage;
      console.log(
        `[Tokens] ↳ prompt:${prompt_tokens}, completion:${completion_tokens}, total:${total_tokens}`,
      );
    } else {
      console.log('[Tokens] No usage data returned');
    }

    const message = response.choices[0]?.message;
    if (message) {
      console.log(message);
    } else {
      console.error('No message in response');
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    process.exit(1);
  }
}

main();
