import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'

const root = document.getElementById('root')

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>
)
