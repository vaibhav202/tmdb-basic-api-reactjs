import React, { useState } from 'react'

function MediaCards({ mediaData, poster_path, original_title, addToWatchList, isAlreadyAdded }) {
  const posterUrl = `https://image.tmdb.org/t/p/w440_and_h660_face/${poster_path}`
  const [activeOverlay, setActiveOverlay] = useState(false)
  return (
    <div style={{ backgroundImage: `url(${posterUrl})` }} className={`bg-center bg-cover bg-no-repeat size-full aspect-[2/3] flex flex-col justify-between items-start overflow-hidden rounded ring ring-black/20 relative group`}>
      <p className={`place-self-start rounded-xs block ${activeOverlay || 'sm:group-hover:-translate-y-0'} ${!activeOverlay && '-translate-y-[calc(100%+var(--spacing)+6px)]'} m-2 px-2 py-1 text-neutral-800 text-left font-bold leading-5 ring ring-black/10 bg-neutral-100 transition-transform`}>{original_title}</p>
      <span title={`Add ${original_title} to Watchlist`} onClick={() => addToWatchList(mediaData)} className={`${activeOverlay || 'sm:group-hover:translate-y-0'} ${!activeOverlay && 'translate-y-[calc(100%+var(--spacing)+6px)]'} place-self-end block material-symbols-rounded rounded-xs ring ring-black/10 bg-neutral-100 m-2 p-1 cursor-pointer z-10 transition-transform`}>
        {isAlreadyAdded ? 'delete' : 'library_add'}
      </span>
      <button
        className='md:hidden absolute w-full h-full inset-0 z-0'
        onClick={() => setActiveOverlay(!activeOverlay)}
      />
    </div>
  )
}

export default MediaCards