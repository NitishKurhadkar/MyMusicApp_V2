"use client";
import { useState, useEffect } from 'react';
import axios from '@/utility/axios';
import AudioCard from './AudioCard';

const PlayList = () => {
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const secondLastIndex = location.pathname.lastIndexOf("/", location.pathname.lastIndexOf("/") - 1) + 1;
        const index = location.pathname.lastIndexOf("/") + 1;
        const playlistName = location.pathname.slice(secondLastIndex, location.pathname.lastIndexOf("/"));
        const artistName = location.pathname.slice(index);

        axios.get(`/${playlistName}/${artistName}`)
        .then(res => setPlaylist(res.data));
    }, [])

    return (
        <div className="overflow-auto w-100 p-4 pt-5 mt-3">
            {playlist ?
                <>
                    <img src={playlist.img} alt="" height={220} width={220} />
                    <div className="pt-4">
                        {playlist.tracks.map((song, i) =>
                            <AudioCard key={i} index={i} playlist={playlist.tracks} songId={song.id} title={song.name} artistName={song.artistName} artistImg={song.img} />
                        )}
                    </div>
                </>
                : null}
        </div>
    )
}

export default PlayList;