import React from 'react'

function WatchlistCards({ mediaData, media_type, poster_path, media_title, vote_average, popularity, addToWatchList }) {
  const posterUrl = `https://image.tmdb.org/t/p/w440_and_h660_face/${poster_path}`
  return (
    <div className={`media-item ${poster_path === null && 'skeleton'}`}>
      <div title={`Poster of ${media_title}`} style={{ backgroundImage: `url(${posterUrl})` }} className='media-item-poster'></div>
      <div className='media-item-info flex-col divide-y divide-black/10 [&>p]:media-item-title [&>p]:watchlist-item-title'>
        <p>{media_title}</p>
        <p>{media_type}</p>
        <p>Rating: {Math.floor(vote_average)}</p>
        <p>Popularity: {Math.floor(popularity)}</p>
        <button onClick={() => addToWatchList(mediaData)} title={`Remove ${media_title} from watchlist`}  aria-label='Remove item from watchlist' className='media-item-icon'>
          <p className='material-symbols-outlined'>delete</p>
        </button>
      </div>
    </div>
  )
}

export default WatchlistCards