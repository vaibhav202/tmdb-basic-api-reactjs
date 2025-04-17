import React from 'react'
import WatchlistCards from './WatchlistCards'

function Watchlist({ mediaType, watchlistItems, addToWatchList }) {
  return (
    <>
      <header className='header-wrapper'>
        <h1 className='row-start-1 title'>Watchlist</h1>
      </header>
      <main className='media-wrapper'>
        <div className='media-items-wrapper'>
          {
            watchlistItems.length > 0 ? (
              watchlistItems.map(mediaData => {
                const media_title = {
                  'original_title': mediaData.original_title,
                  'original_name': mediaData.original_name
                }
                return <WatchlistCards
                  key={mediaData.id}
                  mediaType={mediaType}
                  mediaData={mediaData}
                  poster_path={mediaData.poster_path}
                  media_title={mediaData.media_type === 'movie' ? media_title['original_title'] : media_title['original_name']}
                  media_type={mediaData.media_type === 'movie' ? 'Movie' : 'TV Show'}
                  addToWatchList={addToWatchList}
                  vote_average={mediaData.vote_average}
                  popularity={mediaData.popularity}
                />
              }
              )
            )
              : (
                <p className='block text-lg text-center h-full col-span-full row-span-3'>Nothing has been added to watchlist yet.</p>
              )
          }
        </div>
      </main>
    </>
  )
}

export default Watchlist