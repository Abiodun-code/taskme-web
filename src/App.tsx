import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './pages/not-authentication/AuthLayout'
import Login from './pages/not-authentication/Login'
import Register from './pages/not-authentication/Register'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {

  const authRoute = [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
  ]
  
  const route = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout/>,
      children: authRoute,
    },
  ])

  const ClientKey = import.meta.env.VITE_CLIENT_ID

  return (
    <GoogleOAuthProvider clientId={ClientKey}>
      <RouterProvider router={route} />
    </GoogleOAuthProvider>
  )
}

export default App