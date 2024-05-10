import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Axios
import './config/axios'

// Router
import router from './router/router'

import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      </RouterProvider>
  </React.StrictMode>,
)
