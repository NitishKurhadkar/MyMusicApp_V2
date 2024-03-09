import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AlbumIcon from '@mui/icons-material/Album';
import '../css/Navbar.css';

function Navbar() {
    return (
        <div className="navbar flex-column d-flex align-items-start justify-content-start flex-nowrap">
            <label className="text-white mb-2 pt-2">Recommanded</label>
            <NavLink to="/home">
                <label className="text-secondary py-2 d-flex f-14"><HomeIcon className="me-1"/>Home</label>
            </NavLink>
            <NavLink to="/artist">
                <label className="text-secondary py-2 d-flex f-14"><PermIdentityIcon className="me-1"/>Artist</label>
            </NavLink>
            <NavLink to="/search">
                <label className="text-secondary py-2 d-flex f-14"><SearchIcon className="me-1"/>Search</label>
            </NavLink>
            <NavLink to="/library">
                <label className="text-secondary py-2 d-flex f-14"><AlbumIcon className="me-1"/>Library</label>
            </NavLink>

            <label className="text-white py-2 mt-3">My Library</label>
            <NavLink to="/likedsong">
                <label className="text-secondary py-2 d-flex f-14"><AlbumIcon className="me-1"/>Liked Song</label>
            </NavLink>
            <NavLink to="/recent">
                <label className="text-secondary py-2 d-flex f-14"><AlbumIcon className="me-1"/>Recently Played</label>
            </NavLink>
        </div>
    )
}

export default Navbar;