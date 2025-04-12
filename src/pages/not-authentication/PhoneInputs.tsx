import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import CustomButton from '../../shared/Button'

const PhoneInputs = () => {
  return (
    <div className='flex items-center xl:w-[90%] lg:w-[90%] xl:mx-auto lg:mx-auto justify-start my-auto'>
      <div className=" xl:justify-start w-full xl:items-start">
        <div className='mb-[2rem]'>
          <h1 className='font-inter text-[2rem] lg:text-[2rem] xl:text-[2rem] font-semibold leading-[3rem]'>Enter your Phone Num</h1>
          <p className='font-quick text-[1.2rem] font-medium text-gray-500'>Pick up from where you left off</p>
        </div>
        <div>
          <PhoneInput
            dropdownStyle={{backgroundColor: 'white',}}
            inputStyle={{backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '0.5rem', width: '100%', height: '2.5rem'}}
            country={'us'}
            value={''}
          />
          <CustomButton className='mt-4' to={'/otp'}>Send otp</CustomButton>
        </div>
      </div>
    </div>
  )
}

export default PhoneInputs
