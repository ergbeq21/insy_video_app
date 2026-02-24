import dbPromise from '$lib/server/mongo';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const db = await dbPromise;
    const videos = db.collection("videos");

    await videos.insertOne({title: "Test2", url: "https://test.com"});

    return json({ message: 'MongoDB connected successfully!' });
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }
}