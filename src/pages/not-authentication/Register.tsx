import CustomInput from '../../shared/Input'
import CustomButton from '../../shared/Button'
import { Link, useNavigate } from 'react-router-dom'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../services/store/not-authenticcated/register/RegisterThunk'
import React from 'react'
import { AppDispatch, RootState } from '../../services/store/Store'
import { TopTitle } from '../../utils/TopTittle'

const Register = () => {

  TopTitle('Register - TaskMe')

  const [firstName, setFirstName] = React.useState<string>('')
  const [lastName, setLastName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  
  const dispatch = useDispatch<AppDispatch>() // if you're using Thunk, make sure to use correct typing
  const navigation = useNavigate()

  const { error, isLoading } = useSelector((state: RootState) => state.register)

  const handleRegister = async () => {
    const resultAction = await dispatch(registerUser({ firstName, lastName, email, password }))

    if (registerUser.fulfilled.match(resultAction)) {
      alert(resultAction.payload.message) // or use toast
      navigation('/') // only navigate if registration is successful
    } else {
      alert(resultAction.payload || 'Registration failed')
    }
  }

  return (
    <div className='flex items-center xl:w-[90%] lg:w-[90%] xl:mx-auto lg:mx-auto justify-start my-auto overflow-y-scroll'>
      <div className="xl:justify-start w-full xl:items-start mt-7">
        <div className='mb-[2rem]'>
          <h1 className='font-inter text-[2rem] font-semibold leading-[3rem]'>Register to account</h1>
          <p className='font-quick text-[1.2rem] font-medium text-gray-500'>Pick up from where you left off</p>
        </div>
        <div>
          <div>
            <h2 className='font-league text-lg'>First Name</h2>
            <CustomInput
              placeholder='FirstName'
              className='mb-6'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <h2 className='font-league text-lg'>Last Name</h2>
            <CustomInput
              placeholder='LastName'
              className='mb-6'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <h2 className='font-league text-lg'>Email</h2>
            <CustomInput
              placeholder='Email'
              className='mb-6'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <h2 className='font-league text-lg'>Password</h2>
            <CustomInput
              placeholder='Password'
              type='password'
              className='mb-6'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <CustomButton className='mb-3' onClick={handleRegister} disable={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </CustomButton>

          {error && (
            <p className='text-red-500 font-quick text-sm mt-2 text-center'>{error}</p>
          )}

          <div className='mb-4'>
            <p className='font-quick text-sm text-stone-500 text-center pb-2'>Or Register with Google</p>
            <GoogleLogin
              width={'400%'}
              onSuccess={(credentialResponse: CredentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential!)
                console.log(decoded)
                // Optional: handle Google sign-in here
              }}
            />
          </div>

          <span className="text-[1.1rem] font-quick flex items-center justify-center gap-[.6rem] text-stone-400">
            Already have an account?{' '}
            <Link to="/" className="text-blue-500">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
