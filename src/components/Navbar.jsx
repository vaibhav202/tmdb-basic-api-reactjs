import React from 'react'
import { NavLink } from 'react-router'

function Navbar({ setMediaType }) {
    return (
        <nav className='navbar'>
            <ul aria-label='Menu' className='navbar-items'>
                <li onClick={() => setMediaType('movie')} className='navbar-item'><NavLink className={({ isActive }) => isActive ? ('navbar-item-active') : ('navbar-item-inactive')} to='/'>Movies</NavLink></li>
                <li onClick={() => setMediaType('tv')} className='navbar-item'><NavLink className={({ isActive }) => isActive ? ('navbar-item-active') : ('navbar-item-inactive')} to='/tvshows'>TV Shows</NavLink></li>
                <li className='navbar-item'><NavLink className={({ isActive }) => isActive ? ('navbar-item-active') : ('navbar-item-inactive')} to='/watchlist'>Watchlist</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar
