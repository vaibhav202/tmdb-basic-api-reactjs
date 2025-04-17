import React, { useState } from 'react'

function MediaCards({ mediaData, poster_path, media_title, addToWatchList, isAlreadyAdded }) {
  const posterUrl = `https://image.tmdb.org/t/p/w440_and_h660_face/${poster_path}`
  return (
    <div className={`media-item ${poster_path === null && 'skeleton'}`}>
      <div title={`Poster of ${media_title}`} style={{ backgroundImage: `url(${posterUrl})` }} className='media-item-poster'></div>
      <div className='media-item-info'>
        <p className='media-item-title'>{media_title}</p>
        <button title={isAlreadyAdded ? `Remove ${media_title} from watchlist` : `Add ${media_title} to watchlist` } onClick={() => addToWatchList(mediaData)} className='media-item-icon material-symbols-outlined'>
          {isAlreadyAdded ? 'delete' : 'library_add'}
        </button>
      </div>
    </div>
  )
}

export default MediaCards