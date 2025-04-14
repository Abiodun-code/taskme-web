import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './pages/not-authentication/AuthLayout'
import Login from './pages/not-authentication/Login'
import Register from './pages/not-authentication/Register'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Home from './pages/authentication/Home'
import BodyLayout from './pages/authentication/BodyLayout'
import { useSelector } from 'react-redux'
import { RootState } from './services/store/Store'
import PhoneInputs from './pages/not-authentication/PhoneInputs'
import OtpInputs from './pages/not-authentication/OtpInputs'
import { useEffect, useState } from 'react'

const App = () => {

  const loginToken = useSelector<RootState, string | null>((state) => state.login.accessToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    if (loginToken) {
      localStorage.setItem("accessToken", loginToken);
      setIsAuthenticated(true);
    } else {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    }
  }, [loginToken]);

  if (isAuthenticated === null) return null; // Prevent rendering before auth status is determined

  const authRoute = [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    {path: '/phone', element: <PhoneInputs />},
    {path:"/otp", element: <OtpInputs/>}
  ]

  const taskRoute = [
    {path: '/home', element: <Home />},
  ]
  
  const route = createBrowserRouter([
    isAuthenticated
      ? {
        path: '/',
        element: <BodyLayout />,
        children: taskRoute,
      }
      : {
        path: '/',
        element: <AuthLayout />,
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