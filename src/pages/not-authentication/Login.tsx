import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CustomInput from '../../shared/Input';
import CustomButton from '../../shared/Button';
import { AppDispatch, RootState } from '../../services/store/Store';
import { loginUser } from '../../services/store/not-authenticcated/login/LoginThunk';
import { TopTitle } from '../../utils/TopTittle';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/ui/Spinner';

const Login = () => {
  TopTitle('Login - TaskMe');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 👇 Get loading and error from redux store
  const { isLoading } = useSelector((state: RootState) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success('Logged in successfully!');
      // navigation will happen in useEffect
    }else {
      toast.error('Login failed');
    }
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google User:', decoded);
      toast.success('Logged in with Google!');
    } else {
      toast.error('Google login failed');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts early
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center xl:w-[90%] lg:w-[90%] xl:mx-auto lg:mx-auto justify-start my-auto">
      <div className="xl:justify-start w-full xl:items-start">
        <div className="mb-[2rem]">
          <h1 className="font-inter text-[2rem] font-semibold leading-[3rem]">Login to account</h1>
          <p className="font-quick text-[1.2rem] font-medium text-gray-500">Pick up from where you left off</p>
        </div>

        <div>
          <div>
            <h2 className="font-league text-lg">Email</h2>
            <CustomInput
              placeholder="Email"
              className="mb-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <h2 className="font-league text-lg">Password</h2>
            <CustomInput
              placeholder="Password"
              className="mb-6"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <CustomButton className="mb-4" onClick={handleLogin} disable={isLoading}>
            {isLoading ? (
              <Spinner/>
            ) : (
              'Login'
            )}
          </CustomButton>


          <div className="mb-4">
            <p className="font-quick text-sm text-stone-500 text-center pb-2">Or Login with Google</p>
            <div className="flex justify-center">
              <GoogleLogin
                width="100%"
                onSuccess={handleGoogleLogin}
                onError={() => toast.error('Google login error')}
              />
            </div>
          </div>

          <span className="text-[1.1rem] font-quick flex items-center justify-center gap-[.6rem] text-stone-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
