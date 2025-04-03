import React, { useState } from 'react'
import { NavLink } from 'react-router'
import Search from './Search'


function Navbar({ setMediaType, searchValue, renderSearchValue }) {
    const [displayMenu, setDisplayMenu] = useState(true)
    function handleMenu() {
        setDisplayMenu(!displayMenu)
    }
    const [displaySearch, setDisplaySearch] = useState(true)
    function handleSearchbar() {
        setDisplaySearch(!displaySearch)
    }
    return (
        <nav className='flex flex-row flex-wrap justify-between items-center gap-4 bg-gray-50 border-b border-black/10 text-xl p-4 w-full z-50'>
            <button aria-label='Menu Toggler' id='menu' onClick={handleMenu} className={`md:hidden block order-1 p-0.5 material-symbols-rounded opsz-xl text-gray-200 ${!displayMenu ? 'bg-teal-600' : 'bg-gray-800'} rounded`}>{!displayMenu ? 'close' : 'menu'}</button>
            {!displayMenu &&
                <ul aria-label='Menu' tabIndex='0' className={`sm:w-fit sm:order-1 sm:flex-row sm:py-0 py-2 order-3 flex flex-col justify-center items-center gap-x-0 gap-y-4 w-full tracking-tight whitespace-nowrap`}>
                    <li onClick={() => setMediaType('movie')} className='sm:py-0 flex justify-center items-center font-medium [&>a]:py-0.5 [&>a]:px-4 text-gray-800 [&>a]:rounded'><NavLink className={({ isActive }) => isActive ? ('bg-teal-600 text-gray-200') : ('bg-transparent')} to='/'>Movies</NavLink></li>
                    <li onClick={() => setMediaType('tv')} className='sm:py-0 flex justify-center items-center font-medium [&>a]:py-0.5 [&>a]:px-4 text-gray-800 [&>a]:rounded'><NavLink className={({ isActive }) => isActive ? ('bg-teal-600 text-gray-200') : ('bg-transparent')} to='/tvshows'>TV Shows</NavLink></li>
                    <li className='sm:py-0 flex justify-center items-center font-medium [&>a]:py-0.5 [&>a]:px-4 text-gray-800 [&>a]:rounded'><NavLink className={({ isActive }) => isActive ? ('bg-teal-600 text-gray-200') : ('bg-transparent')} to='/watchlist'>Watchlist</NavLink></li>
                </ul>
            }
            <button aria-label='Searchbar Toggler' onClick={handleSearchbar} type='button' className={`sm:block order-2 p-0.5 hidden material-symbols-rounded opsz-xl text-gray-200 ${!displaySearch ? 'bg-teal-600' : 'bg-gray-800'} rounded-full`}>search</button>
            {!displaySearch && <Search searchValue={searchValue} renderSearchValue={renderSearchValue} />}
        </nav>

    )
}

export default Navbar
