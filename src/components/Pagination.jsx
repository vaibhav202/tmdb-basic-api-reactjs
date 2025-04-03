import React from 'react'

function Pagination({ setPage, previousPage, nextPage, renderPageNo, page, totalPages }) {
    return (
        <div className='grid grid-flow-col auto-cols-auto justify-center place-items-center gap-4 bg-gray-50 border border-black/10 text-gray-600 text-xl font-bold rounded p-4 size-full'>
            <span tabIndex='0' aria-label='Goto Previous Page' onClick={previousPage} className="material-symbols-rounded w-full md:hover:bg-gray-200 active:bg-gray-200 rounded-sm p-1 cursor-pointer">arrow_back</span>
            <input id='pageInput' aria-label='Input field to goto specific page' type='number' min='1' max={totalPages || ''} step='1' onChange={(setPage, renderPageNo)} value={page} className='md:w-3xs w-full [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-full focus:ring focus:ring-gray-300 focus:outline-0 text-center' />
            <span tabIndex='0' aria-label='Goto Next Page' onClick={nextPage} className="material-symbols-rounded w-full md:hover:bg-gray-200 active:bg-gray-200 rounded-sm p-1 cursor-pointer">arrow_forward</span>
        </div>
    )
}

export default Pagination
