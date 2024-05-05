"use client"
import {togglePlay} from '../utility/helper';
import { useStateValue } from '../context/StateProvider';

const LikedSong = () => {
    const [state, dispatch] = useStateValue();

    const handleSongPlayPause = (songId, index) => {
        // console.log(state.recentlyPlayedSong)
		// if (state.playlistName !== "recently") {
		// 	dispatch({
		// 		type: "UPDATE_PLAYLIST",
		// 		playlistUpdated: true,
		// 		playlistName: "recently",
		// 		playlist: {playlist : state.recentlyPlayedSong}
		// 	})
		// }

		togglePlay(state, dispatch, songId, index, "likedSong",  {playlist : state.likedSongPlaylist})
    }

    return (
        <div className="px-3 pb-3 px-md-4 px-lg-4 mt-3 w-100 overflow-auto">
            <h3 className="text-white">Liked Song</h3>
            <div className="grid">
                {state.likedSongPlaylist.length !== 0 ? state.likedSongPlaylist.map((artist, index) => {
                    return (
                        <div key={index} className="p-3 rounded-3 audiocard" style={{ background: "#181818",maxWidth:"222px" }}>
                            <img className="rounded-3 w-100" src={artist.img} alt={""} onClick={() => handleSongPlayPause(artist.id, index)}/>
                            <h6 className="pt-2 text-white">
                                {artist.name}
                            </h6>
                        </div>)
                }) : null}

            </div>
        </div>
    )
}

export default LikedSong;