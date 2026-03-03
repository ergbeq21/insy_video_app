import dbPromise from '$lib/server/mongo';
import { ObjectId } from 'mongodb';

export const GET = async ({ params }) => {
    const { playlistId: id } = params;

    const db = await dbPromise;
    const playlists = db.collection("playlists");
    const playlist = await playlists.findOne({ _id: new ObjectId(id) });

    if (!playlist) {
        return new Response(JSON.stringify({ error: 'Playlist not found' }), { status: 404 });
    }

    const serializedPlaylist = {
        ...playlist,
        _id: playlist._id.toString()
    };

    return new Response(JSON.stringify(serializedPlaylist), { status: 200 });
    
}