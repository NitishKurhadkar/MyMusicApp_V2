import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AlbumIcon from '@mui/icons-material/Album';
import './NavbarMobile.css';

function NavbarMobile() {
    return (
        <div className="navbarmobile d-flex align-items-center justify-content-between px-3 py-2">
            <NavLink to="/home" className="text-center text-secondary">
                <HomeIcon/>
                <p className="text-secondary f-14 mb-0">Home</p>
            </NavLink>
            <NavLink to="/artist" className="text-center text-secondary">
                <PermIdentityIcon />
                <p className="text-secondary f-14 mb-0">Artist</p>
            </NavLink>
            <NavLink to="/search" className="text-center text-secondary">
                <SearchIcon />
                <p className="text-secondary f-14 mb-0">Search</p>
            </NavLink>
            <NavLink to="/library" className="text-center text-secondary">
                <AlbumIcon />
                <p className="text-secondary f-14 mb-0">My Library</p>
            </NavLink>
        </div>
    )
}

export default NavbarMobile;