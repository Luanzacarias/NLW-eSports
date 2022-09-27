import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Ads } from './pages/Ads';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

// Usando react router v6

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      caseSensitive: true,
      element: <Home />,
    },
    {
      path: "games/:gameId/ads",
      element: <Ads />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ])

  return (
    <RouterProvider router={router}  />
  )
}

export default App