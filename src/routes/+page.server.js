import dbPromise from '$lib/server/mongo';

export async function load() {
    const db = await dbPromise;
    const videos = db.collection("videos");

    const videosRows = await videos.find({}).toArray();

    const serializedVideos = videosRows.map(video => ({
        ...video,
        _id: video._id.toString()
    }));

    return {
       videos: serializedVideos
    };
}

export const actions = {

    
    
}