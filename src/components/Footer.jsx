import React from 'react'

function Footer() {
  return (
    <footer className='footer-wrapper'>
      <p className='footer-first-item'>2025 | Made by <a aria-label="Site Author's Portfolio Link" href="https://vaibhav202.github.io">Vaibhav Pancholi</a></p>
      <a aria-label='Goto TMDB API Documentation' title='TMDB API Documentation Link' className='footer-second-item' target='_blank' href='https://developer.themoviedb.org/docs/getting-started'>
        <span>
          TMDB
        </span>
        API
      </a>
      <a aria-label='Source Code Link' title='Source Code Link' href='https://github.com/vaibhav202/tmdb-basic-api-reactjs' className='footer-third-item'>Source code</a>
    </footer>
  )
}

export default Footer