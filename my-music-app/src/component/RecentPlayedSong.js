"use client"
import React from 'react';
import RecentSong from './RecentSong';
import { useStateValue } from '../context/StateProvider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const RecentPlayedSong = () => {

    const [state] = useStateValue();
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
        <div className="px-3 pb-3 px-md-4 px-lg-4 mt-3 w-100 overflow-auto">
            <div className="recent_played">
                <div className="d-flex justify-content-between">
                    <p className="f-lato-b f-24 text-light">Recently Played</p>
                    <div>
                        <ChevronLeftIcon className="text-light f-35 pr-10" onClick={scrollLeft} />
                        <ChevronRightIcon className="text-light f-35" onClick={scrollRight} />
                    </div>
                </div>
                <div className="d-flex overflow-auto py-3">
                    {state.recentlyPlayedSong.map((song, index) => {
                        return <RecentSong key={song.id} title={song.name} songId={song.id} img={song.img} index={index} songUrl={song.url} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default RecentPlayedSong;