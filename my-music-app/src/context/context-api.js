import {createContext, useState} from 'react';
import AudioController from '../component/AudioController';
import RecommandedAudios from '../component/RecommandedAudios';

export const SongContext = createContext();

export const SongProvider = () => {
    const [song, setSong] = useState({songname:'', songartist:''});
    const titles = [{id:"1",name:"Arrows to Athens - Alive", artist:"Arrows to Athens"},{id:"2",name:"Arrows to Athens - Dust & Gold", artist:"Arrows to Athens"},{id:"3",name:"Arrows to Athens - Stars", artist:"Arrows to Athens"}, {id:"4",name:"Arrows to Athens - Used to be", artist:"Arrows to Athens"},{id:"5",name:"Bryan Adams - Here I am", artist:"Bryan Adams"},{id:"6",name:"My Heart Belongs to You", artist:"ks"},{id:"7",name:"Ravenscode - My Escape", artist:"Ravenscode"} ]

    return(
        <SongContext.Provider value={{song:[song, setSong],titles}}>
            <RecommandedAudios />
            <AudioController /> 
        </SongContext.Provider>
    );
}; 