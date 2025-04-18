import React, { useState } from 'react'
import CustomModal from './Modal'
import { FaArrowLeft } from 'react-icons/fa6'
import CustomButton from './Button'

type StepModalProps = {
  isOpen: boolean
  onClose: () => void
  steps: React.ReactNode[]
  onFinish: () => void
}

const StepModal = ({ isOpen, onClose, steps, onFinish }: StepModalProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      onFinish()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    onClose()
  }

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col gap-4 relative">

        {/* Top Left Back Button */}
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className='pt-4'
          >
            <FaArrowLeft />
          </button>
        )}

        {/* Step Content */}
        <div className=""> {/* Push content down to avoid back button overlap */}
          {steps[currentStep]}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-end my-4">
          <CustomButton
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  )
}

export default StepModal
