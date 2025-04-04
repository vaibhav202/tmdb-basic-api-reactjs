import { React, useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router'
import axios from 'axios'
import Navbar from './components/Navbar'
import MediaWrapper from './components/MediaWrapper'
import Watchlist from './components/Watchlist'

function App() {

  const apiToken = import.meta.env.VITE_TMDB_TOKEN

  const [mediaType, setMediaType] = useState(() => {
    const savedMediaType = localStorage.getItem('mediatype')
    return savedMediaType ? savedMediaType : 'movie'
  })

  useEffect(() => {
    localStorage.setItem('mediatype', mediaType.toString())
  }, [mediaType])

  const [media, setMedia] = useState([])


  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage')
    return savedPage ? parseInt(savedPage) : 1
  })

  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    localStorage.setItem('currentPage', page.toString())
  }, [page])

  function previousPage() {
    if (page > 1) setPage(page - 1)
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1)
    }
    else if (page > totalPages) {
      setPage(totalPages)
    }
  }

  function renderPageNo(e) {
    const pageValue = parseInt(e.target.value)
    if (!isNaN(pageValue)) {
      if(totalPages && pageValue > totalPages){
        setPage(totalPages)
      }
      else if(pageValue < 1){
        setPage(1)
      }
      else
      setPage(pageValue)
    }
    else {
      setPage(1)
    }
  }

  useEffect(() => {
    if(totalPages && page > totalPages){
      setPage(totalPages)
    }
  }, [totalPages])

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
        setTotalPages(res.data.total_pages)
      }
      catch (err) { window.alert(err) }
    }

    fetchMedia()

  }, [mediaType, page])

  const [searchValue, setSearchValue] = useState(() => {
    const savedSearchValue = localStorage.getItem('searchvalue')
    return savedSearchValue && savedSearchValue.trim() !== '' ? savedSearchValue : ''
  })

  useEffect(() => {
    localStorage.setItem('searchvalue', searchValue || '')
  }, [searchValue])

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
          setTotalPages(searchRes.data.total_pages)
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
  }

  const [watchlistItems, setWatchlistItems] = useState(() => {
    const savedWatchlist = localStorage.getItem('watchlist')
    return savedWatchlist ? JSON.parse(savedWatchlist) : []
  })

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlistItems))
  }, [watchlistItems])

  function addToWatchList(mediaData) {
    const isAlreadyAdded = watchlistItems.some(isSame => isSame.id === mediaData.id)
    if (isAlreadyAdded) {
      if (window.confirm(`Do you want to remove "${mediaData.original_title}" from watchlist?`)) {
        const updatedWatchList = watchlistItems.filter(isSame => isSame.id !== mediaData.id)
        setWatchlistItems(updatedWatchList)
      }
    }
    else {
      const watchlist = [...watchlistItems, mediaData]
      setWatchlistItems(watchlist)
    }
  }

  const mediaWrapperProps = {
    searchValue,
    searchResults,
    media,
    mediaType,
    setMediaType,
    watchlistItems,
    previousPage,
    nextPage,
    page,
    setPage,
    renderPageNo,
    totalPages,
    addToWatchList,
  }

  return (
    <HashRouter >
      <Navbar setMediaType={setMediaType} mediaType={mediaType} searchValue={searchValue} renderSearchValue={renderSearchValue} searchResults={searchResults} />
      <div className='size-full bg-gray-100 border-black/10 overflow-y-auto'>
        <Routes>
          <Route path='/' element={<MediaWrapper {...mediaWrapperProps} />} />
          <Route path='/tvshows' element={<MediaWrapper {...mediaWrapperProps} />} />
          <Route path='/watchlist' element={<Watchlist media={media} mediaType={mediaType} watchlistItems={watchlistItems} addToWatchList={addToWatchList} />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App