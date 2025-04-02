import { React, useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router'
import axios from 'axios'
import Navbar from './components/Navbar'
import MediaWrapper from './components/MediaWrapper'
import Watchlist from './components/Watchlist'

function App() {

  const apiToken = import.meta.env.VITE_TMDB_TOKEN

  const [mediaType, setMediaType] = useState('movie', () => {
    const savedMediaType = localStorage.getItem('mediatype')
    return savedMediaType ? JSON.parse(savedMediaType) : 'movie'
  })

  const [media, setMedia] = useState([])

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage')
    return savedPage ? parseInt(savedPage) : 1
  })

  useEffect(() => {
    localStorage.setItem('currentPage', page.toString())
  }, [page])

  function previousPage() {
    if( page > 1)  setPage(page - 1)
  }

  function nextPage() {
    setPage(page + 1)
  }

  function renderPageNo(e) {
    setPage(e.target.value)
  }

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US&page=${page}`,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
          }
        }
        const res = await axios.request(options)
        setMedia(res.data.results)
      }
      catch (err) { console.error(err) }
    }

    fetchMedia()

  }, [mediaType, page])

  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])


  useEffect(() => {
    if (searchValue.trim() !== '') {
      const search = async () => {
        try {
          const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/${mediaType}?query=${searchValue}&include_adult=false&language=en-US&page=${page}`,
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiToken}`
            }
          };
          const searchRes = await axios.request(options)
          setSearchResults(searchRes.data.results)
        }
        catch (err) { console.log(err) }
      }
      search()
    }
    else {
      setSearchResults([])
    }
  }, [mediaType, searchValue, page])

  function renderSearchValue(e) {
    setSearchValue(e.target.value)
    // {
    //   searchValue.trim() !== ' ' && (<SearchWrapper searchResults={searchResults} />)
    // }
  }

  const [mediaItems, setMediaItems] = useState(() => {
    const savedWatchlist = localStorage.getItem('watchlist')
    return savedWatchlist ? JSON.parse(savedWatchlist) : []
  })

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(mediaItems))
  }, [mediaItems])

  function addToWatchList(mediaData) {
    const isAlreadyAdded = mediaItems.some(isSame => isSame.id === mediaData.id)
    if (isAlreadyAdded) {
      if (window.confirm(`Do you want to remove "${mediaData.original_title}" from watchlist?`)) {
        const updatedWatchList = mediaItems.filter(isSame => isSame.id !== mediaData.id)
        setMediaItems(updatedWatchList)
      }
    }
    else {
      const watchlist = [...mediaItems, mediaData]
      setMediaItems(watchlist)
    }
  }

  const mediaWrapperProps ={
    searchValue,
    searchResults,
    media,
    mediaType,
    setMediaType,
    mediaItems,
    previousPage,
    nextPage,
    page,
    setPage,
    renderPageNo,
    addToWatchList,
  }

  return (
    <HashRouter >
      <Navbar setMediaType={setMediaType} mediaType={mediaType} searchValue={searchValue} renderSearchValue={renderSearchValue} searchResults={searchResults} />
      <div className='overflow-y-auto h-full bg-neutral-200 border-black/10'>
        <Routes>
          <Route path='/' element={<MediaWrapper {...mediaWrapperProps} />} />
          <Route path='/tvshows' element={<MediaWrapper {...mediaWrapperProps} />} />
          <Route path='/watchlist' element={<Watchlist media={media} mediaType={mediaType} mediaItems={mediaItems} addToWatchList={addToWatchList} />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App