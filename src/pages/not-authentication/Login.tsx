import CustomInput from '../../shared/Input'
import CustomButton from '../../shared/Button'
import { Link } from 'react-router-dom'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const Login = () => {
  
  return (
    <div className='flex items-center xl:w-[90%] lg:w-[90%] xl:mx-auto lg:mx-auto justify-start my-auto'>
      <div className=" xl:justify-start w-full xl:items-start">
        <div className='mb-[2rem]'>
          <h1 className='font-inter text-[2rem] lg:text-[2rem] xl:text-[2rem] font-semibold leading-[3rem]'>Login to account</h1>
          <p className='font-quick text-[1.2rem] font-medium text-gray-500'>Pick up from where you left off</p>
        </div>
        <div>
          <div>
            <h2 className='font-league text-lg'>Email</h2>
            <CustomInput placeholder='Email' className='mb-6' />
          </div>
          <div>
            <h2 className='font-league text-lg'>Password</h2>
            <CustomInput placeholder='Password' className='mb-6' />
          </div>
          <CustomButton className='mb-4' to={'/home'}>Login</CustomButton>
          <div className='mb-4'>
            <p className='font-quick text-sm text-stone-500 text-center pb-2'>Or Login with Google</p>
            <GoogleLogin width={'400%'} onSuccess={(credentialReponse: CredentialResponse)=>{console.log(jwtDecode(credentialReponse.credential!))}} />
          </div>
          <span className="text-[1.1rem] font-quick flex items-center justify-center gap-[.6rem] text-stone-400">
            Don't have an account?{" "}
            <Link to="/register" className=" text-blue-500">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login