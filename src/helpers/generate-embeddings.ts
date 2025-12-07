import { openai } from '../services/openaiClient.js';

const EMBEDDING_MODEL = 'text-embedding-3-small';

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    dimensions: 256,
    input: texts,
  });

  return response.data.map((item) => item.embedding);
}
