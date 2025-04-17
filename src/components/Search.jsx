import React from 'react'
import SearchResults from './SearchResults'

function Search({ searchValue, renderSearchValue, searchResults, mediaType }) {
  return (
    <div>
      <form className='searchbar-wrapper'>
        <input id='searchBar' type='text' aria-label='Searchbar' placeholder={`Search for ${mediaType === 'movie' ? 'movies' : 'tv shows'}`} onChange={renderSearchValue}
          value={searchValue}
          className='searchbar'
        />
        {searchValue.trim() === '' &&
          <label htmlFor='searchBar' className="searchbar-icon material-symbols-outlined">
            search
          </label>
        }
      </form>
      {
        searchValue.trim() !== '' &&
        <SearchResults searchResults={searchResults} />
      }
    </div>
  )
}

export default Search