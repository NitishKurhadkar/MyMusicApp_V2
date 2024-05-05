import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';

const AudioList = ({ playlist, listName, album }) => {
    
    const router = useRouter()
    
    const openPlaylist = (playlistName, albumName) => {
        router.push(`/browse/playlist/${playlistName}/${albumName}`);
    }

    const scrollLeft = (e) => {
        const element = e.target.closest("div").nextSibling
        element.scrollTo({
            left: element.scrollLeft - 200,
            behavior: 'smooth'
        })
    }

    const scrollRight = (e) => {
        const element = e.target.closest("div").nextSibling
        element.scrollTo({
            left: element.scrollLeft + 200,
            behavior: 'smooth'
        })
    }

    return (
        <div className="py-3">
            <div className="d-flex align-items-center">
                <h3 className="text-white mb-0">{listName}</h3>
                <ChevronLeftIcon id="left" className="text-light f-35 pr-10 ms-auto" onClick={scrollLeft} />
                <ChevronRightIcon className="text-light f-35" onClick={scrollRight} />
            </div>
            <div className="d-flex pt-1 overflow-auto">
                {playlist !== null ? album === "artist" ?
                    playlist.map((artist, i) => {
                        return (
                            <div key={i} className="p-3 me-3 rounded-3 audiocard" style={{ background: "#181818" }} onClick={() => openPlaylist(album, artist.artistName)}>
                                <img className="rounded-3" src={artist.artistImg} width={190} height={190} alt={""} />
                                <h6 className="pt-2 text-white">{artist.artistName}</h6>
                            </div>)
                    })
                    : playlist.map((movie, i) => {
                        return (
                            <div key={i} className="p-3 me-3 rounded-3 audiocard" style={{ background: "#181818" }} onClick={() => openPlaylist(album, movie.albumName)}>
                                <img className="rounded-3" src={movie.img} width={190} height={190} alt={""} />
                                <h6 className="pt-2 text-white">{movie.albumName}</h6>
                            </div>)
                    }) : null}
            </div>
        </div>
    )
}

export default AudioList;