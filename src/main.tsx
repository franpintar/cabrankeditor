import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SceneProvider } from './context/SceneContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SceneProvider>
      <App />
    </SceneProvider>
  </StrictMode>,
)
