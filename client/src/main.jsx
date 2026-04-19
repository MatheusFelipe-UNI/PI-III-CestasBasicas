import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App.jsx';
import { Home } from './Components/Pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      //Home
      {
        path: "/",
        element: <Home/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
