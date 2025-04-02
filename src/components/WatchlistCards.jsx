import React from 'react'

function WatchlistCards({mediaData, poster_path, original_title, original_name, vote_average, popularity, addToWatchList}) {
  return (
    <div className='grid grid-flow-col auto-cols-auto justify-start items-center gap-4 size-full overflow-clip rounded p-2 bg-neutral-100 border border-black/10'>
      <picture className='size-full bg-neutral-300 overflow-clip rounded-xs border border-black/10
                [&>img]:block [&>img]:w-[110px] [&>img]:h-[180px] [&>img]:object-cover [&>img]:object-center
                '>
        <img src={`https://image.tmdb.org/t/p/w440_and_h660_face/${poster_path}`} alt={original_title} />
      </picture>
      <div className='grid grid-flow-row auto-rows-fr justify-center place-items-start gap-2 w-full'>
        <p className='text-lg text-start text-neutral-800 font-bold leading-5'>{original_title}{original_name}</p>
        <p className='text-lg text-start text-neutral-800 font-medium leading-5'>Rating: {Math.floor(vote_average)}</p>
        <p className='text-lg text-start text-neutral-800 font-medium leading-5'>Popularity: {Math.floor(popularity)}</p>
        <p onClick={() => addToWatchList(mediaData)} aria-label='Remove from watchlist' className='watchlist-add material-symbols-rounded p-1 bg-neutral-200/80 rounded-sm ring ring-inset ring-neutral-950/20 cursor-pointer'>
          delete
        </p>
      </div>
    </div>
  )
}

export default WatchlistCards