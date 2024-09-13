import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './navigation/RootLayout'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'
import ReservationPage from './pages/ReservationPage'
import PrivateRoute from './navigation/PrivateRoute'
import AuthenticationContextProvider from './contexts/AuthenticationContext'
import TicketHistoryPage from './pages/TicketHistoryPage'
import ToastContextProvider from './contexts/ToasterContext'
import LoggedInContextProvider from './contexts/LoggedInContext'

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/movie/:id',
        element: <MovieDetailPage />
      },
      {
        path: '/reservation/:presentationId',
        element: (
          <AuthenticationContextProvider>
            <PrivateRoute>
              <ReservationPage />
            </PrivateRoute>
          </AuthenticationContextProvider>
        ) 
      },
      {
        path: '/user/tickets',
        element: (
          <AuthenticationContextProvider>
            <PrivateRoute>
              <TicketHistoryPage />
            </PrivateRoute>
          </AuthenticationContextProvider>
        )
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ToastContextProvider>
    <LoggedInContextProvider>
      <RouterProvider router={browserRouter} />
    </LoggedInContextProvider>
  </ToastContextProvider>
)
