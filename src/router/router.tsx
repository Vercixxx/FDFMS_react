// Pages
import React from 'react';
import LoginPage from '../pages/LoginPage'
import MainPage from '../pages/MainPage'

// Router
import { 
  createBrowserRouter,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <MainPage />,
  },
]);


export default router;