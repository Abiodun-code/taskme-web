import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AuthLayout from './pages/not-authentication/AuthLayout';
import Login from './pages/not-authentication/Login';
import Register from './pages/not-authentication/Register';
import PhoneInputs from './pages/not-authentication/PhoneInputs';
import OtpInputs from './pages/not-authentication/OtpInputs';

import BodyLayout from './pages/authentication/BodyLayout';
import Home from './pages/authentication/Home';

import { useAuth } from './hooks/useAuth';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { isAuthenticated } = useAuth();
  const ClientKey = import.meta.env.VITE_CLIENT_ID;

  const router = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <BodyLayout /> : <AuthLayout />,
      children: isAuthenticated
        ? [
          { index: true, element: <Navigate to="home" replace /> },  // 👈 redirect "/" to "home"
          { path: 'home', element: <Home /> },
        ]
        : [
          { index: true, element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'phone', element: <PhoneInputs /> },
          { path: 'otp', element: <OtpInputs /> },
        ],
    },
    { path: '*', element: <Navigate to="/" replace /> }, // 👈 catch unknown paths
  ]), [isAuthenticated]);

  return (
    <GoogleOAuthProvider clientId={ClientKey}>
      <RouterProvider router={router} />
      <ToastContainer
        position='top-center'
        transition={Slide}
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ fontSize: 16, fontFamily: 'inherit' }}
      />
    </GoogleOAuthProvider>
  );
};

export default App;
