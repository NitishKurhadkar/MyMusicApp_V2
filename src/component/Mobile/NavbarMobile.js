"use client"
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HomeIcon from '@mui/icons-material/Home';
import AlbumIcon from '@mui/icons-material/Album';
import './NavbarMobile.css';
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavbarMobile() {
    const pathName = usePathname();
    return (
        <div className="navbarmobile d-flex align-items-center justify-content-between px-3 py-2">
            <Link href="/" className={`text-center text-secondary ${pathName === '/' && "active"}`}>
                <HomeIcon/>
                <p className="text-secondary f-14 mb-0">Home</p>
            </Link>
            <Link href="/artist" className={`text-center text-secondary ${pathName === '/artist' && "active"}`}>
                <PermIdentityIcon />
                <p className="text-secondary f-14 mb-0">Artist</p>
            </Link>
            <Link href="/search" className={`text-center text-secondary ${pathName === '/search' && "active"}`}>
                <SearchIcon />
                <p className="text-secondary f-14 mb-0">Search</p>
            </Link>
            <Link href="/library" className={`text-center text-secondary ${pathName === '/library' && "active"}`}>
                <AlbumIcon />
                <p className="text-secondary f-14 mb-0">My Library</p>
            </Link>
        </div>
    )
}

export default NavbarMobile;