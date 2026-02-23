import clientPromise from '$lib/server/mongo';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    await db.command({ ping: 1 });

    return json({ message: 'MongoDB connected successfully!' });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}