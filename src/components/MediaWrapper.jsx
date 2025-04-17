import React from 'react'
import MediaCards from './MediaCards'
import Pagination from './Pagination'
import Search from './Search'

function MediaWrapper({ error, searchValue, renderSearchValue, searchResults, media, mediaType, watchlistItems, setPage, previousPage, nextPage, page, renderPageNo, totalPages, addToWatchList }) {
  function renderMedia(item) {
    const isAlreadyAdded = watchlistItems.some(savedItem => savedItem.id === item.id)
    const titles = {
      movie: item.original_title,
      tv: item.original_name
    }
    return (
      <MediaCards
        key={item.id}
        mediaData={item}
        poster_path={item.poster_path}
        media_title={titles[mediaType]}
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
    (searchResults.length !== 0 ?
      (<>Search results for <span className='gradient-text'>{searchValue}</span> in <span className='media-type'>{titleMediaType[mediaType]}</span></>)
      :
      (<><span>No results</span> found for <span className='gradient-text'>{searchValue}</span> in <span className='media-type'>{titleMediaType[mediaType]}</span></>))
    :
    (mediaType === 'movie' ? <>Trending <span className='media-type'>Movies</span></> : <>Trending <span className='media-type'>TV Shows</span></>)
  return (
    <>
      <header className='header-wrapper'>
        <Search
          mediaType={mediaType}
          searchResults={searchResults}
          searchValue={searchValue}
          renderSearchValue={renderSearchValue}
        />
        <h1 className='title'>
          {media.length === 0 ?
            (<>Loading Content<span className='gradient-text'>...</span></>)
            :
            error ?
              (<>{`:(`} Unable to load content.<br />Reason: <span className='loading-error'>{error.message}</span></>)
              :
              (<>{title}</>)
          }
        </h1>
      </header>
      {media.length !== 0 &&
        <main className='media-wrapper'>
          {}
          <label htmlFor="pageInput" className='text-slate-400'>You are on page number: {page}</label>
          <div className='media-items-wrapper'>
            {displayMedia.map(item => renderMedia(item))}
          </div>
          {totalPages > 1 &&
            <Pagination
              media={media}
              setPage={setPage}
              previousPage={previousPage}
              nextPage={nextPage}
              page={page}
              renderPageNo={renderPageNo}
              totalPages={totalPages}
            />
          }
        </main>
      }
    </>
  )
}


export default MediaWrapper