"use client"
import { useState, useEffect } from 'react';
import { useStateValue } from "../context/StateProvider";
import { togglePlay } from '../utility/helper';
import '@/css/Search.css';
import axios from '@/utility/axios';
import { useRouter } from 'next/navigation';

const Search = () => {
    const [inputSearch, setInputSearch] = useState("");
    const [state, dispatch] = useStateValue();
    const router = useRouter();

    useEffect(() => {
        if (inputSearch === "") {
            dispatch({
                type: "SEARCH_LIST",
                searchArtistList: [],
                searchSongList: [],
                searchMovieList: []
            })
        }
       else{
        axios.get(`/search/${inputSearch}`)
            .then((res) => {
                dispatch({
                    type: "SEARCH_LIST",
                    searchArtistList: res.data.artistList,
                    searchSongList: res.data.songList,
                    searchMovieList: res.data.movieList
                })
            })
    }
    }, [inputSearch])

    const addSongToPlaylist = (element) => {
        dispatch({
            type: "ADD_SONG_TO_PLAYLIST",
            playStatus: true,
            songs: [element],
            currentSongIndex: 0,
            playlistName: element.artist
        })
        togglePlay(state, dispatch, element.id, 0, element.artist, { playlist: [element] })
    }

    const openPlaylist = (playlistName, albumName) => {
        router.push(`/browse/playlist/${playlistName}/${albumName}`);
    }
    return (
        <div className="px-3 pb-3 px-md-4 px-lg-4 mt-3 w-100 overflow-auto searchbox">
            <input onChange={(e) => setInputSearch(e.target.value)} value={inputSearch} className="position-fixed py-2 px-3 searchbar" placeholder="Search" type="text"/>
            {inputSearch === "" ? <p className="text-white position-absolute">Enter Search</p> :
             inputSearch !== "" ?
                state.searchArtistList.length === 0 && state.searchSongList.length === 0 && state.searchMovieList.length === 0 ?
                    <p className="text-white position-absolute">No result found</p>
                    :
                    <>
                        {state.searchSongList.length !== 0 ?
                            <>
                                <h4 className="text-white">Songs</h4>
                                <div className="grid pt-1">
                                    {
                                        state.searchSongList.map((song, index) => {
                                            return (
                                                <div key={song.name + index} className="p-3 rounded-3 audiocard">
                                                    <img className="rounded-3 w-100" src={song.img} alt="" onClick={() => addSongToPlaylist(song)} />
                                                    <p className="pt-2 text-white text-truncate mb-0" title={song.name}>{song.name}</p>
                                                </div>)
                                        })}
                                </div>
                            </> : null
                        }

                        {state.searchArtistList.length !== 0 ?
                            <>
                                <h4 className="text-white">Albums</h4>
                                <div className="grid pt-1">
                                    {
                                        state.searchArtistList.map((artist, index) => {
                                            return (
                                                <div key={index} className="p-3 rounded-3 audiocard">
                                                    <img className="rounded-3 w-100" src={artist.artistImg} alt="" onClick={() => openPlaylist("artist", artist.artistName)} />
                                                    <p className="pt-2 text-white text-truncate mb-0" title={artist.artistName}>{artist.artistName}</p>
                                                </div>)
                                        })}
                                </div>
                            </> : null
                        }

                        {state.searchMovieList.length !== 0 ?
                            <>
                                <h4 className="text-white">Movies</h4>
                                <div className="grid pt-1">
                                    {
                                        state.searchMovieList.map((movie, index) => {
                                            return (
                                                <div key={index} className="p-3 rounded-3 audiocard">
                                                    <img className="rounded-3 w-100" src={movie.img} alt="" onClick={() => openPlaylist("movies", movie.name)} />
                                                    <p className="pt-2 text-white text-truncate mb-0" title={movie.name}>{movie.name}</p>
                                                </div>)
                                        })}
                                </div>
                            </> : null
                        }
                    </> : null
            }
        </div>
    )
}

export default Search;