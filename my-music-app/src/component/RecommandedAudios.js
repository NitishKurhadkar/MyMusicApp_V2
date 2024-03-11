"use client"
import { useEffect, useState } from 'react';
import axios from '@/utility/axios';
import AudioList from './AudioList';
import '../css/RecommendedAudios.css';

function RecommandedAudios() {
	const [playlist, setPlaylist] = useState(null);
	useEffect(() => {

		axios.get('/')
			.then((res) => {
				setPlaylist(res.data);
			})
	}, [])

	return (
		<div className="recommanded px-3 px-md-4 px-lg-4 overflow-auto" >
			{playlist !== null ?
				<>
					<AudioList playlist={playlist.artistList} listName="Popular Artists" album="artist" />
					<AudioList playlist={playlist.movieList} listName="Popular Movies" album="movie" />
				</>
				: null}
		</div>
	);
}
export default RecommandedAudios;