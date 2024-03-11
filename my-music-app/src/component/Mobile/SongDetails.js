import { useState } from 'react';
import Slider from '@mui/material/Slider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useStateValue } from "../../context/StateProvider";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { togglePlay } from './../helper';
import CloseIcon from '@mui/icons-material/Close';
import '../../css/icon.css';
import './SongDetails.css'

function SongDetails({ audioEl, songTime, isShowSongCard }) {
    const [state, dispatch] = useStateValue();
    const [songPlayingTime, setSongPlayingTime] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const songTimeConvertInMinAndSec = (currentTime) => {
        let currentSongTimeInMinutes = "0" + Math.floor(currentTime / 60);
        let currentSongTimeInSeconds = Math.floor(currentTime % 60);
        currentSongTimeInSeconds = currentSongTimeInSeconds < 10 ? "0" + currentSongTimeInSeconds : currentSongTimeInSeconds;
        let songTimeInMinAndSec = currentSongTimeInMinutes + ":" + currentSongTimeInSeconds

        if (isNaN(currentSongTimeInMinutes) || currentSongTimeInSeconds === undefined)
            return

        else
            return songTimeInMinAndSec
    }

    const handleSeekbarTime = (event, newValue) => {
        setIsSeeking(true)
        setSongPlayingTime(newValue);
    }

    const handleAudioCurrentTime = () => {
        audioEl.current.currentTime = songPlayingTime;
        setIsSeeking(false);
    }

    const playNextSong = () => {
        if (state.playlist.length === 1) {
            audioEl.current.currentTime = 0;
            audioEl.current.play()
        }

        let index = state.currentSongIndex + 1;
        if (state.currentSongIndex === state.playlist.length - 1) {
            index = 0;
        }

        dispatch({
            type: "NEXT_PREV_SONG",
            index,
            id: state.playlist[index].id
        })
    }

    const playPrevSong = () => {
        let index = state.currentSongIndex - 1;

        if (state.currentSongIndex === 0) {
            index = state.playlist.length - 1;
        }

        dispatch({
            type: "NEXT_PREV_SONG",
            index,
            id: state.playlist[index].id
        })
    }

    // const timeUpdate = (event) => {
    //     if (!isSeeking)
    //         setSongPlayingTime(event.target.currentTime)
    // }

    const likeSong = () => {
        const currentSongId = state.playlist[state.currentSongIndex].id;
        const isPresent = state.likedSongPlaylist.some((song) => song.id === currentSongId)
        if (!isPresent) {
            dispatch({
                type: "LIKED_SONG",
                likedSong: [state.playlist[state.currentSongIndex]]
            })
        }
    }

    const dislikeSong = () => {
        dispatch({
            type: "DISLIKED_SONG",
            dislikedSong: [state.playlist[state.currentSongIndex]]
        })

    }

    return (
        <div className="songdetails p-3 w-100 text-center h-100 position-fixed">
            <CloseIcon className="text-danger position-absolute ms-auto" onClick={isShowSongCard} style={{ right: "7px", top: "6px" }} />
            <img src={state.playlist[state.currentSongIndex].img} alt="" class="m-auto pt-4" />
            <div className="d-flex flex-column justify-content-center w-100">
                <div className="d-flex align-items-center justify-content-between m-auto py-3">
                    <SkipPreviousIcon className="text-white" fontSize="large" onClick={playPrevSong} />
                    {state.playStatus ?
                        <PauseIcon className="text-white" fontSize="large" onClick={() => togglePlay(state, dispatch, state.playlist[state.currentSongIndex].id, state.currentSongIndex)} />
                        : <PlayArrowIcon className="text-white" onClick={() => togglePlay(state, dispatch, state.playlist[state.currentSongIndex].id, state.currentSongIndex)} />}
                    <SkipNextIcon className="text-white" fontSize="large" onClick={playNextSong} />
                </div>
                <div className="seekbar_container w-100">

                    <label className="pe-3 f-14 f-lato-r">{songTime}</label>

                    <Slider onChange={handleSeekbarTime}
                        value={audioEl.current !== null && !isSeeking ? audioEl.current.currentTime : songPlayingTime}
                        max={audioEl.current !== null ? audioEl.current.duration : 0}
                        onChangeCommitted={handleAudioCurrentTime}
                    />
                    <input type="range" value={songPlayingTime} max={audioEl.current !== null && !isNaN(audioEl.current.duration) ? audioEl.current.duration : 0} onChange={handleSeekbarTime} onMouseUp={handleAudioCurrentTime} />
                    <label className="ps-3 f-14 f-lato-r">{audioEl.current !== null && !isNaN(audioEl.current.duration) ? songTimeConvertInMinAndSec(audioEl.current.duration) : "00:00"}</label>
                </div>
            </div>
            <div class="text-center">
                <h3 className="f-lato-r mb-0 text-white py-1">{state.playlist[state.currentSongIndex].name}</h3>
                <h6 className="f-lato-r mb-0 text-white pt-1 pb-2">{state.playlist[state.currentSongIndex].artist}</h6>
            </div>
            {state.likedSongPlaylist.some((song) => song.id === state.playlist[state.currentSongIndex].id) ?
                <FavoriteIcon className="text-danger" onClick={dislikeSong} /> :
                <FavoriteBorderIcon onClick={likeSong} />
            }

        </div>
    )
}

export default SongDetails;
