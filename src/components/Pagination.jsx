import React from 'react'

function Pagination({ setPage, previousPage, nextPage, renderPageNo, page, totalPages }) {
    return (
        <div className='pagination-wrapper'>
            {page !== 1 &&
                <button aria-label='Goto Previous Page' onClick={previousPage} className='col-start-1 material-symbols-outlined pagination-button'>arrow_back</button>
            }
            <input id='pageInput' aria-label='Input field to goto specific page' type='number' min='1' max={totalPages || ''} step='1' onChange={(setPage, renderPageNo)} value={page} className='pagination-input' />
            {page !== totalPages &&
                <button aria-label='Goto Next Page' onClick={nextPage} className='col-start-3 material-symbols-outlined pagination-button'>arrow_forward</button>
            }
        </div>
    )
}

export default Pagination
