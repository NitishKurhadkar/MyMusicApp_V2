import React from 'react';
import { useStateValue } from "../context/StateProvider";
import { togglePlay } from '../utility/helper';
import '../css/RecentSong.css';
import '../css/icon.css';

function RecentSong({ title, songId, img, index }) {
	const [state, dispatch] = useStateValue();

	const handleSongPlayPause = () => {
		togglePlay(state, dispatch, songId, index, "recently", {playlist : state.recentlyPlayedSong})
	}

	return (
		<div id={songId} className="d-flex flex-column pe-5" onClick={handleSongPlayPause}>
			<img src={img} alt={img} />
			<p className="text-light f-16 f-lato-r text-center pt-3">{title}</p>
		</div>
	);
}

export default RecentSong;