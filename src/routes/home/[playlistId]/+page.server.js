import dbPromise from '$lib/server/mongo';
import { ObjectId } from 'mongodb';

export async function load({ params, fetch, url }) {
	const { playlistId: id } = params;

	const response = await fetch(`/api/${id}`);

	if (!response.ok) {
		return { status: response.status, error: 'Playlist not found' };
	}

	const playlist = await response.json();

	const db = await dbPromise;

    const search  = url.searchParams.get('q') ?? '';

	const sortBy = url.searchParams.get('sortBy');
	const asc = url.searchParams.get('asc') === 'true';

	const sortField = sortBy === 'views' || sortBy === 'likes' ? sortBy : 'views';
	const sortOrder = asc ? 1 : -1;

	const playlistVideoLinks = await db
		.collection('playlist_videos')
		.find({ playlistId: new ObjectId(id) })
		.toArray();

	const videoIds = playlistVideoLinks.map((link) => new ObjectId(link.videoId));

	const videos = await db
		.collection('videos')
		.find({ _id: { $in: videoIds, },
        ...search ? { title: { $regex: search, $options: 'i' } } : {} })
		.sort({ [sortField]: sortOrder })
		.toArray();

	const serializedVideos = videos.map((video) => ({
		...video,
		_id: video._id.toString()
	}));

	return { playlist, videos: serializedVideos };
}
