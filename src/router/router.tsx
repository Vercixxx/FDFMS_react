// Pages
import React from 'react';
import LoginPage from '../pages/LoginPage'

// Router
import { 
  createBrowserRouter,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
]);


export default router;