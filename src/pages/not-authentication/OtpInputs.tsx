import React from 'react'
import CustomButton from '../../shared/Button'
import CustomInput from '../../shared/Input'

const OtpInputs = () => {
  return (
    <div className='flex items-center xl:w-[90%] lg:w-[90%] xl:mx-auto lg:mx-auto justify-start my-auto'>
      <div className=" xl:justify-start w-full xl:items-start">
        <div className='mb-[2rem]'>
          <h1 className='font-inter text-[2rem] lg:text-[2rem] xl:text-[2rem] font-semibold leading-[3rem]'>Enter Otp sent</h1>
          <p className='font-quick text-[1.2rem] font-medium text-gray-500'>Pick up from where you left off</p>
        </div>
        <div>
          <CustomInput placeholder='Verify Otp' className='mb-6' />
          <CustomButton className='mt-4'>Verify otp</CustomButton>
        </div>
      </div>
    </div>
  )
}

export default OtpInputs