export const togglePlay = (state, dispatch, songId, index, artist, playlist) => {

    if (artist !== undefined && state.playlistName !== artist) {
        dispatch({
            type: "UPDATE_PLAYLIST",
            playlist: playlist,
            playlistName: artist,
            playlistUpdated: true,
            
        })
    }

    if (state.playlist && state.currentSongIndex !== null && state.playlist[state.currentSongIndex].id === songId && state.playStatus)
        pauseSong(state, dispatch, index)
    else
        if (state.currentSongIndex !== null && state.playlist[state.currentSongIndex].id !== songId || !state.playStatus)
           playSong(songId, dispatch, index)
}

const playSong = (songId, dispatch, index) => {
    dispatch({
        type: 'SET_SONG_ID',
        currentSongIndex: index,
        playStatus: true,
        id: songId,

    })
}

const pauseSong = (state, dispatch, index) => {
    dispatch({
        type: 'PAUSE_SONG',
        playStatus: false,
        currentSongIndex: index
    })

}