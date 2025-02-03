import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster 
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#4CAF50',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
        },
      }}
    />
    <App />
  </React.StrictMode>,
)
