"use client"
import { useEffect, useState, useRef } from 'react';
import Slider from '@mui/material/Slider';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUp from '@mui/icons-material/VolumeUp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useStateValue } from "../context/StateProvider";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CircularProgress from '@mui/material/CircularProgress';
import { togglePlay } from './helper';
import axios from '@/utility/axios';
import "../css/AudioController.css";
import '../css/icon.css';
import SongDetails from './Mobile/SongDetails';

function AudioController() {
    const [state, dispatch] = useStateValue();
    const [songPlayingTime, setSongPlayingTime] = useState(0);
    const audioEl = useRef(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const [isShowSongCard, setIsShowSongCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true)
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
        setIsLoading(true)
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

    const timeUpdate = (event) => {
        if (audioEl.current.duration > 0)
            setIsLoading(false)

        if (!isSeeking)
            setSongPlayingTime(event.target.currentTime)
    }

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

    const showSongCard = (e) => {
        const controlButton = e.target.closest(".control_buttons");
        if (window.innerWidth < 720 && controlButton === null)
            setIsShowSongCard(!isShowSongCard)
    }

    useEffect(() => {
        if (audioEl.current) {
            if (state.playStatus) {
                audioEl.current.play()
                    .then(res => axios.post('saveSongDuration', { name: state.playlist[state.currentSongIndex].name, duration: audioEl.current.duration }))

                if (state.playlistName !== "recently") {
                    dispatch({
                        type: "RECENTLY_PLAYED_SONG",
                        index: state.playlist[state.currentSongIndex]
                    })
                }
            }
            else {
                audioEl.current.pause();
            }
        }
    }, [state.playStatus, state.playingSongId])

    if (!state.playlist[state.currentSongIndex]) return;

    return (<>
        {isShowSongCard ?
            <SongDetails audioEl={audioEl} songTime={songTimeConvertInMinAndSec(songPlayingTime)} isShowSongCard={showSongCard} /> : null}
        <div className="songContainer p-3 text-white w-100 d-flex justify-content-between" onClick={showSongCard}>
            {state.playlist !== undefined && state.playlist.length !== 0 ?
                <audio ref={audioEl} src={state.playlist[state.currentSongIndex].url} onTimeUpdate={timeUpdate} onEnded={playNextSong}></audio> : null
            }

            <div className="d-flex justify-content-center align-items-center">
                <img src={state.playlist[state.currentSongIndex].img} alt="" height={50} width={50} />
                <div className="ms-3">
                    <p className="f-lato-r mb-0 f-16">{state.playlist[state.currentSongIndex].name}</p>
                    <p className="f-14 f-lato-r mb-0">{state.playlist[state.currentSongIndex].artistName}</p>
                </div>
                {window.innerWidth > 720 ? state.likedSongPlaylist.some((song) => song.id === state.playlist[state.currentSongIndex].id) ?
                    <FavoriteIcon className="ms-3 text-danger" onClick={dislikeSong} /> :
                    <FavoriteBorderIcon className="ms-3" onClick={likeSong} /> : null
                }
            </div>
            <div className="d-flex flex-column justify-content-center w-30 audio_controller">
                <div className="d-flex align-items-center justify-content-between w-100px m-auto control_buttons">
                    <SkipPreviousIcon onClick={playPrevSong} />
                    {isLoading ?
                        <CircularProgress style={{ width: "25px", height: "25px" }} /> :
                        state.playStatus ?
                            <PauseIcon onClick={() => togglePlay(state, dispatch, state.playlist[state.currentSongIndex].id, state.currentSongIndex)} />
                            : <PlayArrowIcon onClick={() => togglePlay(state, dispatch, state.playlist[state.currentSongIndex].id, state.currentSongIndex)} />
                    }
                    <SkipNextIcon onClick={playNextSong} /></div>
                <div className="seekbar_container w-100">
                    {window.innerWidth > 720 ?
                        <label className="pe-3 f-14 f-lato-r">{songTimeConvertInMinAndSec(songPlayingTime)}</label> : null
                    }

                    <Slider disabled={isLoading ? true : false} onChange={handleSeekbarTime}
                        value={audioEl.current !== null && !isSeeking ? audioEl.current.currentTime : songPlayingTime}
                        max={audioEl.current !== null ? audioEl.current.duration : 0}
                        onChangeCommitted={handleAudioCurrentTime}
                    />
                    <input type="range" value={songPlayingTime} max={audioEl.current !== null && !isNaN(audioEl.current.duration) ? audioEl.current.duration : 0} onChange={handleSeekbarTime} onMouseUp={handleAudioCurrentTime} />
                    {window.innerWidth > 720 ?
                        <label className="ps-3 f-14 f-lato-r">{audioEl.current !== null && !isNaN(audioEl.current.duration) ? songTimeConvertInMinAndSec(audioEl.current.duration) : "00:00"}</label>
                        : null
                    }
                </div>
            </div>
            {window.innerWidth > 720 ?
                <div className="volume">
                    {audioEl.current !== null ? audioEl.current.volume === 0 ? <VolumeOffIcon /> : audioEl.current.volume <= 0.5 ? <VolumeDownIcon /> : <VolumeUp /> : <VolumeUp />}
                    <Slider defaultValue={1} max={1} step={0.01} onChange={(e, newValue) => audioEl.current.volume = newValue} />
                    <label>{audioEl.current !== null ? parseInt(audioEl.current.volume * 100) : 100}</label>
                </div> : null}
        </div>
    </>

    )
}

export default AudioController;
