import CustomInput from '../../shared/Input'
import CustomButton from '../../shared/Button'
import { Link } from 'react-router-dom'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux'
// import { RootState } from '../../services/store/Store'
import { registerUser } from '../../services/store/not-authenticcated/register/RegisterThunk'
import React from 'react'

const Register = () => {

  const [firstName, setFirstName] = React.useState<string>('')
  const [lastName, setLastName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const dispatch = useDispatch()

  // const {error, isLoading} = useSelector<RootState>((state) => state.register)

  const handleRegister = () => {
    dispatch(registerUser({firstName, lastName,email, password,}))
    console.log(firstName, lastName, email, password)
  }

  return (
    <div className='flex items-center xl:w-[90%] lg:w-[90%] xl:mx-auto lg:mx-auto justify-start my-auto overflow-y-scroll'>
      <div className=" xl:justify-start w-full xl:items-start mt-7">
        <div className='mb-[2rem]'>
          <h1 className='font-inter text-[2rem] lg:text-[2rem] xl:text-[2rem] font-semibold leading-[3rem]'>Register to account</h1>
          <p className='font-quick text-[1.2rem] font-medium text-gray-500'>Pick up from where you left off</p>
        </div>
        <div>
          <div>
            <h2 className='font-league text-lg'>First Name</h2>
            <CustomInput placeholder='FirstName' className='mb-6' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
          </div>
          <div>
            <h2 className='font-league text-lg'>Last Name</h2>
            <CustomInput placeholder='LastName' className='mb-6' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
          </div>
          <div>
            <h2 className='font-league text-lg'>Email</h2>
            <CustomInput placeholder='Email' className='mb-6' value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <h2 className='font-league text-lg'>Password</h2>
            <CustomInput placeholder='Password' className='mb-6' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <CustomButton className='mb-3' to={'/phone'}>Register</CustomButton>
          <div className='mb-4'>
            <p className='font-quick text-sm text-stone-500 text-center pb-2'>Or Register with Google</p>
            <GoogleLogin width={'400%'} onSuccess={(credentialReponse: CredentialResponse) => { console.log(jwtDecode(credentialReponse.credential!)) }} />
          </div>
          <span className="text-[1.1rem] font-quick flex items-center justify-center gap-[.6rem] text-stone-400">
            Already have an account?{" "}
            <Link to="/" className=" text-blue-500">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register