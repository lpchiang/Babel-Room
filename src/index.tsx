import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <div className='bg-blue-300 size-full'>
    <StrictMode>
      <App />
    </StrictMode>
  </div>
)
