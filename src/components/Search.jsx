import React, { useState } from 'react'

function Search({ searchValue, renderSearchValue }) {
  return (
    <div className='order-4 w-full flex justify-center items-center gap-4 relative z-50'>
      <input id='searchBar' type='text' placeholder='Search for movies and tv shows' onChange={renderSearchValue}
        value={searchValue}
        className='sm:w-[calc(100dvw*0.5)] sm:content-end focus:outline-0 focus:ring-2 focus:ring-teal-600 block ring ring-inset ring-neutral-400 rounded-md text-neutral-600 text-lg px-4 py-1 w-full bg-neutral-50' />
    </div>
  )
}

export default Search