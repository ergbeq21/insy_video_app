import dbPromise from '$lib/server/mongo';

export async function load({ url }) {
    const db = await dbPromise;
    const videos = db.collection("videos");

    const sortBy = url.searchParams.get('sortBy');
    const asc = url.searchParams.get('asc') === 'true';

    const sortField = sortBy === 'views' || sortBy === 'likes' ? sortBy : 'views';
    const sortOrder = asc ? 1 : -1;

    const videosRows = await videos.find({}).sort({ [sortField]: sortOrder }).toArray();

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