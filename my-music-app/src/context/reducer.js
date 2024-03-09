export const initialState = {
    currentSongId: null,
    playStatus: false,
    currentSongIndex: null,
    playingSongId: null,
    playlistName: null,
    songPlaying: null,
    recentlyPlayedSong: [],
    controllerPlaylist: [],
    likedSongPlaylist: [],
    playlist: [],
    playlistUpdated: false,
    searchArtistList: [],
    searchSongList: [],
    searchMovieList: [],
    titles: [{ id: "1", name: "Arrows to Athens - Alive", artist: "Arrows to Athens", img: "arrows-to-athens.jpg" }, { id: "2", name: "Arrows to Athens - Dust & Gold", artist: "Arrows to Athens", img: "arrows-to-athens.jpg" }, { id: "3", name: "Arrows to Athens - Stars", artist: "Arrows to Athens", img: "arrows-to-athens.jpg" }, { id: "4", name: "Arrows to Athens - Used to be", artist: "Arrows to Athens", img: "arrows-to-athens.jpg" }, { id: "5", name: "Bryan Adams - Here I am", artist: "Bryan Adams" }, { id: "6", name: "My Heart Belongs to You", artist: "ks" }, { id: "7", name: "Ravenscode - My Escape", artist: "Ravenscode" }]
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_SONG_ID":
            return {
                ...state,
                playStatus: action.playStatus,
                playingSongId: action.id,
                currentSongIndex: action.currentSongIndex,
                songPlaying: action.songPlaying
            }

        case "SET_PLAY_STATUS":
            return {
                ...state,
                playStatus: action.playStatus,
            }

        case "PAUSE_SONG":
            return {
                ...state,
                playStatus: action.playStatus,
                currentSongIndex: action.currentSongIndex
            }

        case "NEXT_PREV_SONG":
            return {
                ...state,
                currentSongIndex: action.index,
                playingSongId: action.id
            }

        case "RECENTLY_PLAYED_SONG":
            let newRecentSongArray = state.recentlyPlayedSong.filter((i) => i !== action.index)

            return {
                ...state,
                recentlyPlayedSong: [action.index].concat(newRecentSongArray)
            }

        case "UPDATE_PLAYLIST":
            return {
                ...state,
                playlistUpdated: action.playlistUpdated,
                playlist: action.playlist.playlist,
                playlistName: action.playlistName
            }

        case "ADD_SONG_TO_PLAYLIST":
            return {
                ...state,
                playStatus: action.playStatus,
                playlist: action.songs.concat(state.playlist),
                currentSongIndex: 0,
                playingSongId: action.songs[0].id,
                playlistName: action.playlistName
            }

        case "SEARCH_LIST":
            return {
                ...state,
                searchArtistList: action.searchArtistList,
                searchSongList: action.searchSongList,
                searchMovieList: action.searchMovieList
            }

        case "LIKED_SONG":
            return {
                ...state,
                likedSongPlaylist: state.likedSongPlaylist.concat(action.likedSong)
            }

        case "DISLIKED_SONG":
            const playlist = state.likedSongPlaylist.filter((song) =>
                song.id === action.dislikedSong.id
            )
            return {
                ...state,
                likedSongPlaylist: playlist
            }

        default:
            return {
                state
            }
    }

}

export default reducer;