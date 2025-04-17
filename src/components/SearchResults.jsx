import React from 'react'

function SearchResults({ searchResults }) {
    return (
        <ul>
            {
                searchResults.map((resultItem) => {
                    <li>{resultItem.original_title}</li>
                })
            }
        </ul>
    )
}

export default SearchResults