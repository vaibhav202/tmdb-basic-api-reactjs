import React, { useEffect, useState } from 'react'
import MediaCards from './MediaCards'
import Pagination from './Pagination'

function MediaWrapper({ searchValue, searchResults, media, mediaType, watchlistItems, setPage, previousPage, nextPage, page, renderPageNo, totalPages, addToWatchList }) {

  function renderMedia(item) {
    const isAlreadyAdded = watchlistItems.some(savedItem => savedItem.id === item.id)
    const titles = {
      movie: item.original_title,
      tv: item.original_name
    }
    return (
      <MediaCards
        key={item.id}
        searchResults={searchResults}
        mediaData={item}
        poster_path={item.poster_path}
        original_title={titles[mediaType]}
        isAlreadyAdded={isAlreadyAdded}
        addToWatchList={addToWatchList}
      />
    )
  }

  const displayMedia = searchValue.trim() === '' ? media : searchResults
  const titleMediaType = {
    movie: 'Movies',
    tv: 'TV Shows'
  }
  const title = searchValue.trim() !== '' ?
    (searchResults.length === 0 ?
      (<><span className='text-pink-600'>No results</span> found for <span className='text-teal-600'>{searchValue}</span> in <span className='text-teal-600'>{titleMediaType[mediaType]}</span></>)
      : (<>Search results for <span className='text-teal-600'>{searchValue}</span> in <span className='text-teal-600'>{titleMediaType[mediaType]}</span></>))
    : (mediaType === 'movie' ? <>Trending <span className='text-teal-600'>Movies</span></> : <>Trending <span className='text-teal-600'>TV Shows</span></>)

  return (
    <main className='flex flex-col justify-start items-center w-full gap-4
      [&>h1]:w-full [&>h1]:px-4 [&>h1]:pt-8 [&>h1]:text-center [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-800 [&>h1]:leading-7 
    '>
      <h1>{title}</h1>
      <div className='lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid grid-cols-2 auto-cols-auto gap-4 px-4 pt-4'>
        {displayMedia.map(item => renderMedia(item))}
      </div>
      {totalPages > 1 &&
        <Pagination media={media} setPage={setPage} previousPage={previousPage} nextPage={nextPage} page={page} renderPageNo={renderPageNo} totalPages={totalPages} />
      }

    </main>
  )
}

export default MediaWrapper