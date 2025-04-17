import { React, useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router'
import axios from 'axios'
import Navbar from './components/Navbar'
import MediaWrapper from './components/MediaWrapper'
import Watchlist from './components/Watchlist'
import Footer from './components/Footer'

function App() {
  const apiToken = import.meta.env.VITE_TMDB_TOKEN

  const [mediaType, setMediaType] = useState(() => {
    const savedMediaType = localStorage.getItem('mediatype')
    return savedMediaType ? savedMediaType : 'movie'
  })
  useEffect(() => {
    localStorage.setItem('mediatype', mediaType.toString())
  }, [mediaType])

  const [media, setMedia] = useState(() => {
    const savedMedia = localStorage.getItem('media')
    return savedMedia ? JSON.parse(savedMedia) : []
  })

  useEffect(() => {
    localStorage.setItem('media', JSON.stringify(media))
  }, [media])

  const [page, setPage] = useState(() => {
    const savedPage = sessionStorage.getItem('currentPage')
    return savedPage ? parseInt(savedPage) : 1
  })

  useEffect(() => {
    sessionStorage.setItem('currentPage', page.toString())
  }, [page])

  const [totalPages, setTotalPages] = useState()

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
      if (totalPages && pageValue > totalPages) {
        setPage(totalPages)
      }
      else if (pageValue < 1) {
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
    if (totalPages && page > totalPages) {
      setPage(totalPages)
    }
  }, [totalPages])

  const [searchValue, setSearchValue] = useState(() => {
    const savedSearchValue = sessionStorage.getItem('searchvalue')
    return savedSearchValue && savedSearchValue.trim() !== '' ? savedSearchValue : ''
  })

  useEffect(() => {
    sessionStorage.setItem('searchvalue', searchValue || '')
  }, [searchValue])

  const [searchResults, setSearchResults] = useState([])

  const apiTopUrl = 'https://api.themoviedb.org/3'
  const apiUrls = {
    trendingData: `${apiTopUrl}/trending/${mediaType}/day?language=en-US&page=${page}`,
    search: `${apiTopUrl}/search/${mediaType}?query=${searchValue}&include_adult=false&language=en-US&page=${page}`
  }
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const options = {
          method: 'GET',
          url: `${apiUrls.trendingData}`,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiToken}`
          }
        }
        const res = await axios.request(options)
        setMedia(res.data.results)
        setTotalPages(res.data.total_pages)
      }
      catch (err) { setError(err) }
    }

    fetchMedia()

  }, [mediaType, page])

  useEffect(() => {
    if (searchValue.trim() !== '') {
      const search = async () => {
        try {
          const options = {
            method: 'GET',
            url: `${apiUrls.search}`,
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiToken}`
            }
          };
          const searchRes = await axios.request(options)
          setSearchResults(searchRes.data.results)
          setTotalPages(searchRes.data.total_pages)
        }
        catch (err) { setError(err) }
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
    const original_title = mediaData.original_title
    const original_name = mediaData.original_name
    if (isAlreadyAdded) {
      if (window.confirm(`Do you want to remove "${mediaData.media_type === 'movie' ? original_title : original_name}" from watchlist?`)) {
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
    error,
    searchValue,
    renderSearchValue,
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
    <HashRouter>
      <Navbar setMediaType={setMediaType} mediaType={mediaType} searchValue={searchValue} renderSearchValue={renderSearchValue} searchResults={searchResults} />
      <Routes>
        <Route path='/' element={<MediaWrapper {...mediaWrapperProps} />} />
        <Route path='/tvshows' element={<MediaWrapper {...mediaWrapperProps} />} />
        <Route path='/watchlist' element={<Watchlist media={media} mediaType={mediaType} watchlistItems={watchlistItems} addToWatchList={addToWatchList} />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App