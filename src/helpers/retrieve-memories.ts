import { cosineDistance, desc, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { memoriesTable } from '../db/schema/memories-schema.js';
import { generateEmbeddings } from './generate-embeddings.js';

export async function retrieveMemories(
  query: string,
  limit = 10,
): Promise<(typeof memoriesTable.$inferSelect)[]> {
  const [queryEmbedding] = await generateEmbeddings([query]);

  const similarity = sql<number>`1 - (${cosineDistance(
    memoriesTable.embedding,
    queryEmbedding,
  )})`;

  return db.query.memories.findMany({
    orderBy: desc(similarity),
    limit,
  });
}
