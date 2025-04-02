import React from 'react'

function Pagination({ setPage, previousPage, nextPage, renderPageNo, page }) {

    return (
        <div className='grid grid-flow-col auto-cols-auto justify-center place-items-center gap-4 bg-neutral-100 border border-black/10 text-neutral-600 text-xl font-bold rounded p-4 w-full h-full'>
            <span onClick={previousPage} className="material-symbols-rounded w-full hover:bg-neutral-600 rounded-sm p-1 cursor-pointer">arrow_back</span>
            <input type='number' min='1' onChange={(setPage, renderPageNo)} value={page === '' ? '1' : page} className='w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-full focus:border focus:border-neutral-300 focus:outline-0 text-center' />
            <span onClick={nextPage} className="material-symbols-rounded w-full hover:bg-neutral-600 rounded-sm p-1 cursor-pointer">arrow_forward</span>
        </div>



    )
}

export default Pagination
