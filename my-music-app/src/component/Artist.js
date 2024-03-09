import React, { useEffect, useState } from 'react';
import '../css/Artist.css'
import axios from 'axios';
const Artist = ({history}) => {
    const [playlist, setPlaylist] = useState(null);
    useEffect(() => {
        axios.get('/artist')
        .then(res=>{
            setPlaylist(res.data)
        })
    }, [])
    const openPlaylist = (playlistName, albumName) => {
        history.push(`/browse/playlist/${playlistName}/${albumName}`);
    }
    return (
        <div className="px-3 pb-3 px-md-4 px-lg-4 mt-3 w-100 overflow-auto artist">
            <h3 className="text-white">Artist</h3>
            <div className="grid">
                {playlist !== null ? playlist.map((artist, i) => {
                    return (
                        <div key={i} className="p-3 rounded-3 audiocard" style={{ background: "#181818" }} onClick={() => openPlaylist("artist", artist.artistName)}>
                            <img className="rounded-3 w-100" src={artist.artistImg} alt={""} />
                            <h6 className="pt-2 text-white">
                                {artist.artistName}
                            </h6>
                        </div>)
                }) : null}

            </div>
        </div>
    )
}

export default Artist;