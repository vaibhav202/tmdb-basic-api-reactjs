import React from 'react'
import WatchlistCards from './WatchlistCards'

function Watchlist({ mediaType, mediaItems, addToWatchList }) {
  return (
    <main className='lg:grid-cols-3 md:grid-cols-2 grid grid-cols-1 auto-cols-[100%] gap-4 p-4 w-full
    [&>h1]:w-full [&>h1]:col-span-full [&>h1]:text-left [&>h1]:text-2xl [&>h1]:font-black [&>h1]:text-neutral-800'>
      <h1 className='row-start-1'>Watchlist</h1>
      {
        mediaItems.length > 0 ? (
          mediaItems.map((mediaData) => {
            const titles = {
              movie: mediaData.original_title,
              tv: mediaData.original_name
            }
            return <WatchlistCards
              key={mediaData.id}
              mediaType={mediaType}
              mediaData={mediaData}
              poster_path={mediaData.poster_path}
              original_title={titles.movie}
              original_name={titles.tv}
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
    </main>
  )
}

export default Watchlist