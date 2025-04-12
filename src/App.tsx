import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './pages/not-authentication/AuthLayout'
import Login from './pages/not-authentication/Login'
import Register from './pages/not-authentication/Register'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Home from './pages/authentication/Home'
import BodyLayout from './pages/authentication/BodyLayout'
import { Provider } from 'react-redux'
import { store } from './services/store/Store'
import PhoneInputs from './pages/not-authentication/PhoneInputs'
import OtpInputs from './pages/not-authentication/OtpInputs'

const App = () => {

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
    {
      path: '/',
      element: <AuthLayout/>,
      children: authRoute,
    },
    {
      path: '/home',
      element: <BodyLayout/>,
      children: taskRoute,
    }
  ])

  const ClientKey = import.meta.env.VITE_CLIENT_ID

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={ClientKey}>
        <RouterProvider router={route} />
      </GoogleOAuthProvider>
    </Provider>
  )
}

export default App