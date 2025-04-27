import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <div className='bg-blue-400 w-full h-screen'>
    <StrictMode>
      <App />
    </StrictMode>
  </div>
)
