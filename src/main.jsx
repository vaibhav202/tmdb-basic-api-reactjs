import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

let root = document.getElementById('root')

root.classList.add('flex', 'flex-col', 'justify-start', 'items-safe', 'h-dvh', 'overflow-y-hidden')

createRoot(root).render(
    <App />
)
