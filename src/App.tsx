import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import AuthLayout from './pages/not-authentication/AuthLayout';
import Login from './pages/not-authentication/Login';
import Register from './pages/not-authentication/Register';
import BodyLayout from './pages/authentication/BodyLayout';
import Home from './pages/authentication/Home';

import { useAuth } from './hooks/useAuth';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './services/store/Store';
import { setAuth } from './services/store/not-authenticcated/login/LoginSlice';

const App = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const ClientKey = import.meta.env.VITE_CLIENT_ID;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(setAuth({ accessToken: token }));
    }
  }, [dispatch]);

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
        ],
    },
    { path: '*', element: <Navigate to="/" replace /> }, // 👈 catch unknown paths
  ]), [isAuthenticated]);

  return (
    <GoogleOAuthProvider clientId={ClientKey}>
      <RouterProvider router={router} />
      <ToastContainer
        position='top-right'
        transition={Slide}
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ fontSize: ".9rem", fontFamily: 'Quicksand' }}
      />
    </GoogleOAuthProvider>
  );
};

export default App;
