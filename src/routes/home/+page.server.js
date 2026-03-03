import dbPromise from '$lib/server/mongo';

export async function load() {
	const db = await dbPromise;
	const playlists = db.collection('playlists');
	const playlistsRows = await playlists.find({}).toArray();

	const serializedPlaylists = playlistsRows.map((playlist) => ({
		...playlist,
		_id: playlist._id.toString()
	}));

	return {
		playlists: serializedPlaylists
	};
}
