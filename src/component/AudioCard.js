import React from 'react';
import { useStateValue } from "../context/StateProvider";
import { togglePlay } from '../utility/helper';
import '../css/AudioCard.css';
import '../css/icon.css';

function AudioCard({ title, songId, playlistName, index, artistName, playlist, artistImg }) {
	const [state, dispatch] = useStateValue();
	return (
		<div className="d-flex align-items-center text-white f-16 mb-4">
			<label className={`px-2 index ${state.playStatus && state.playingSongId === songId ? 'pause' : 'play'}`}>{index + 1}</label>
			<img className="rounded-4 mx-3" src={artistImg} width={50} height={50} alt="" onClick={() => togglePlay(state, dispatch, songId, index, artistName, playlist = { playlist })} />
	        <label>{title}</label>
		</div>
	);
}

export default AudioCard;
