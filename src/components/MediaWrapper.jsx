import React, { useEffect, useState } from 'react'
import MediaCards from './MediaCards'
import Pagination from './Pagination'

function MediaWrapper({ searchValue, searchResults, media, mediaType, mediaItems, setPage, previousPage, nextPage, page, renderPageNo, addToWatchList }) {

  function renderMedia(item) {
    const isAlreadyAdded = mediaItems.some(savedItem => savedItem.id === item.id)
    const titles = {
      movie: item.original_title,
      tv: item.original_name
    }
    return (
      <MediaCards
        key={item.id}
        mediaData={item}
        poster_path={item.poster_path}
        original_title={titles[mediaType]}
        isAlreadyAdded={isAlreadyAdded}
        addToWatchList={addToWatchList}
      />
    )
  }

  const displayMedia = searchValue.trim() === '' ? media : searchResults
  const title = searchValue.trim() !== '' ? `Search results for ${searchValue}` : mediaType === 'movie' ? 'Trending Movies' : 'Trending TV Shows'

  return (
    <main className='flex flex-col justify-start items-center w-full gap-4 p-4
      [&>h1]:w-full [&>h1]:text-left [&>h1]:text-3xl [&>h1]:font-black [&>h1]:text-neutral-800 
    '>
      <h1>{title}</h1>
      <div className='lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid grid-cols-2 auto-cols-auto gap-4'>
        {displayMedia.map(item => renderMedia(item))}
      </div>
      <Pagination media={media} setPage={setPage} previousPage={previousPage} nextPage={nextPage} page={page} renderPageNo={renderPageNo} />
    </main>
  )
}

export default MediaWrapper