"use client";
// import axios from "@/utility/axios";
import axios from "axios"
import { useState } from "react";

const UploadSong = () => {
    const [formData, setFormData] = useState({});
    const [isSongUploaded, setIsSongUploaded] = useState()
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formData.albumName && formData.artistName && formData.artistImage && formData.albumArtistImage) {
            // setIsSongUploaded(true)
            const formDataInstance = new FormData();
            formDataInstance.append("albumName",formData.albumName)
            formDataInstance.append("artistName",formData.artistName)
            formDataInstance.append("songName",formData.songName)
            formDataInstance.append("artistImg",formData.artistImage)
            formDataInstance.append("albumImage",formData.albumArtistImage)
            formDataInstance.append("song",formData.song)
            axios({
                method: 'POST',
                url: `https://my-music-app-server-6yia.vercel.app/uploadSong`,
                withCredentials: false,
                data: formDataInstance
              });
            // const res = await axios.post('/uploadSong', formDataInstance)
            // debugger
        }
    }
    return (
        <div className="px-3 pb-3 px-md-4 px-lg-4 mt-3 w-100 overflow-auto">
            {isSongUploaded ?
                <h3 className="text-white mb-4">Song Uploaded Successfully</h3>
                :
                <>
                    <h3 className="text-white mb-4">Upload Song</h3>
                    <div className='d-flex flex-column'>
                        <form>
                            <div className="form-group d-flex flex-column mb-4">
                                <label htmlFor="album-name" className='text-light mb-1'>Album Name</label>
                                <input id="artist-name" className='text-light' onChange={e => setFormData(prev => ({ ...prev, albumName: e.target.value }))} required/>
                            </div>
                            <div className="form-group d-flex flex-column mb-4">
                                <label htmlFor="component-helper" className='text-light mb-1'>Artist Name *</label>
                                <input id="artist-name" className='text-light' onChange={e => setFormData(prev => ({ ...prev, artistName: e.target.value }))} />
                            </div>
                            <div className="form-group d-flex flex-column mb-4">
                                <label htmlFor="artist-image" className='text-light mb-1'>Song Name *</label>
                                <input id="artist-name" className='text-light' onChange={e => setFormData(prev => ({ ...prev, songName: e.target.value }))} />
                            </div>
                            <div className="form-group d-flex flex-column mb-4">
                                <label htmlFor="artist-image" className='text-light mb-1'>Artist Image *</label>
                                <input id="artist-image" className='text-light' type="file" name="artistImg" accept="image/*" onChange={e => setFormData(prev => ({ ...prev, artistImage: e.target.files[0] }))} />
                            </div>
                            <div className="form-group d-flex flex-column mb-4">
                                <label htmlFor="artist-image" className='text-light mb-1'>Album / Artist Image *</label>
                                <input id="artist-image" aria-describedby="component-error-text" className='text-light' type="file" name="albumImage" accept="image/*" onChange={e => setFormData(prev => ({ ...prev, albumArtistImage: e.target.files[0] }))} />
                            </div>
                            <div className="form-group d-flex flex-column mb-4">
                                <label htmlFor="song" className='text-light mb-1'>Song *</label>
                                <input id="song" aria-describedby="component-error-text" className='text-light' type="file" name="song" accept="audio/*" onChange={e => setFormData(prev => ({ ...prev, song: e.target.files[0] }))} />
                            </div>
                            <button type="submit" className="btn btn-secondary" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </>}
        </div>
    )
}

export default UploadSong;