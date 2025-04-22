import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CustomInput from '../../shared/Input';
import CustomButton from '../../shared/Button';
import Spinner from '../../components/ui/Spinner';
import { AppDispatch, RootState } from '../../services/store/Store';
import { registerUser } from '../../services/store/not-authenticcated/register/RegisterThunk';
import { TopTitle } from '../../utils/TopTittle';

const Register = () => {
  TopTitle('Register - TaskMe');

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: RootState) => state.register);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const resultAction = await dispatch(registerUser({ firstName, lastName, email, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success(resultAction.payload.message || 'Registered successfully!');
      navigate('/');
    } else {
      toast.error('Registration failed');
    }
  };

  const handleGoogleRegister = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google User:', decoded);
      toast.success('Registered with Google!');
      // Optionally navigate user after Google login
    } else {
      toast.error('Google registration failed');
    }
  };

  return (
    <div className="flex items-center xl:w-[90%] lg:w-[90%] xl:mx-auto lg:mx-auto justify-start my-auto overflow-y-scroll">
      <div className="xl:justify-start w-full xl:items-start mt-7">
        <div className="mb-[2rem]">
          <h1 className="font-inter text-[2rem] font-semibold leading-[3rem]">Register an account</h1>
          <p className="font-quick text-[1.2rem] font-medium text-gray-500">Start your journey with TaskMe</p>
        </div>

        <div>
          <div>
            <h2 className="font-league text-lg">First Name</h2>
            <CustomInput
              placeholder="First Name"
              className="mb-6"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <h2 className="font-league text-lg">Last Name</h2>
            <CustomInput
              placeholder="Last Name"
              className="mb-6"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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
              type="password"
              className="mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <CustomButton className="mb-4" onClick={handleRegister} disable={isLoading}>
            {isLoading ? (
              <Spinner className="border-r-orange-400 border-l-blue-600" />
            ) : (
              'Register'
            )}
          </CustomButton>

          <div className="mb-4">
            <p className="font-quick text-sm text-stone-500 text-center pb-2">Or Register with Google</p>
            <div className="flex justify-center">
              <GoogleLogin
                width="100%"
                onSuccess={handleGoogleRegister}
                onError={() => toast.error('Google registration error')}
              />
            </div>
          </div>

          <span className="text-[1.1rem] font-quick flex items-center justify-center gap-[.6rem] text-stone-400">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
