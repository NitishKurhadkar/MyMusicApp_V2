"use client"
import Header from "@/component/Header";
import NavbarMobile from "@/component/Mobile/NavbarMobile";
import Navbar from "@/component/Navbar";
import { useStateValue } from '@/context/StateProvider';
import AudioController from "@/component/AudioController";
import { StateProvider } from "@/context/StateProvider";
import reducer, { initialState } from '@/context/reducer';

const CommonComponents = ({ children }: { children: React.ReactNode }) => {
    const [state] = useStateValue();
    const height = state.currentSongIndex !== null ? { height: 'calc( 100% - 71px)' } : { height: '100%' };
    return (
        <div className="App">
            <Header />
            <div className="d-flex" style={height}>
                {window.innerWidth < 720 ?
                    <NavbarMobile /> : <Navbar />
                }

                {children}
                {/* <RecommandedAudios /> */}
            </div>
            {/* <Header />
            <div className="d-flex" style={height}>
                {window.innerWidth < 720 ?
                    <NavbarMobile /> : <Navbar />
                }
                {children}
                <RecommandedAudios />
            </div>
            {state.currentSongIndex !== null ? <AudioController /> : null} */}
            <AudioController />
        </div>
    )
}
const LandingPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <CommonComponents>{children}</CommonComponents>
        </StateProvider>
    )
}
export default LandingPage