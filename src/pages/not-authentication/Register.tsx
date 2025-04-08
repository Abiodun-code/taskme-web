import CustomInput from '../../shared/Input'
import CustomButton from '../../shared/Button'
import { Link } from 'react-router-dom'

const Register = () => {

  return (
    <div className='flex items-center xl:w-[90%] lg:w-[90%] xl:mx-auto lg:mx-auto justify-start my-auto'>
      <div className=" xl:justify-start w-full xl:items-start">
        <div className='mb-[2rem]'>
          <h1 className='font-inter text-[2rem] lg:text-[2rem] xl:text-[2rem] font-semibold leading-[3rem]'>Register to account</h1>
          <p className='font-quick text-[1.2rem] font-medium text-gray-500'>Pick up from where you left off</p>
        </div>
        <div>
          <div className=''>
            <CustomInput placeholder='Email' className='mb-6' />
            <CustomInput placeholder='Password' className='mb-4' />
          </div>
          <CustomButton className='mb-3'>Register</CustomButton>
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