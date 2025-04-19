import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useMemo } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AuthLayout from './pages/not-authentication/AuthLayout';
import Login from './pages/not-authentication/Login';
import Register from './pages/not-authentication/Register';
import PhoneInputs from './pages/not-authentication/PhoneInputs';
import OtpInputs from './pages/not-authentication/OtpInputs';

import BodyLayout from './pages/authentication/BodyLayout';
import Home from './pages/authentication/Home';

import { useAuth } from './hooks/useAuth'; // <--- Use the new hook

const App = () => {
  const { isAuthenticated } = useAuth();

  const authRoute = [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/phone', element: <PhoneInputs /> },
    { path: '/otp', element: <OtpInputs /> },
  ];

  const taskRoute = [
    { path: '/home', element: <Home /> },
  ];

  const router = useMemo(() => createBrowserRouter([
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
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ]), [isAuthenticated]);

  const ClientKey = import.meta.env.VITE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={ClientKey}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
