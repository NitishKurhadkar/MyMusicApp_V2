import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HomeIcon from '@mui/icons-material/Home';
import AlbumIcon from '@mui/icons-material/Album';
import Upload from "@mui/icons-material/Upload"
import '../css/Navbar.css';
import Link from 'next/link'
import { usePathname } from "next/navigation";

function Navbar() {
    const pathName = usePathname();
    return (
        <div className="navbar flex-column d-flex align-items-start justify-content-start flex-nowrap">
            <label className="text-white mb-2 pt-2">Recommanded</label>
            <Link href="/" className={`${pathName === '/' && "active"}`}>
                <label className="text-secondary py-2 d-flex f-14"><HomeIcon className="me-1"/>Home</label>
            </Link>
            <Link href="/artist" className={`${pathName === '/artist' && "active"}`}>
                <label className="text-secondary py-2 d-flex f-14"><PermIdentityIcon className="me-1"/>Artist</label>
            </Link>
            <Link href="/search" className={`${pathName === '/search' && "active"}`}>
                <label className="text-secondary py-2 d-flex f-14"><SearchIcon className="me-1"/>Search</label>
            </Link>
            {/* <Link href="/library">
                <label className="text-secondary py-2 d-flex f-14"><AlbumIcon className="me-1"/>Library</label>
            </Link> */}

            <label className="text-white py-2 mt-3">My Library</label>
            <Link href="/likedsong" className={`${pathName === '/likedsong' && "active"}`}>
                <label className="text-secondary py-2 d-flex f-14"><AlbumIcon className="me-1"/>Liked Song</label>
            </Link>
            <Link href="/recent" className={`${pathName === '/recent' && "active"}`}>
                <label className="text-secondary py-2 d-flex f-14"><AlbumIcon className="me-1"/>Recently Played</label>
            </Link>
            <Link href="/uploadSong" className={`${pathName === '/uploadSong' && "active"}`}>
                <label className="text-secondary py-2 d-flex f-14"><Upload className="me-1"/>Upload Song</label>
            </Link>
        </div>
    )
}

export default Navbar;