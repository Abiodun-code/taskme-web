import React, { useState } from 'react'
import StepModal from '../../shared/StepModal'
import CustomInput from '../../shared/Input'

const AddTask = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleFinish = () => {
    console.log('Task Added:', { title, description })
    onClose()
    setTitle('')
    setDescription('')
  }

  const StepOne = (
    <div>
      <h1 className="text-xl font-semibold font-inter mb-4 pt-4">Add Task</h1>
      <CustomInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="p-2 font-league text-lg font-light border border-gray-300 rounded-md w-full mt-2"
        rows={4}
      />
    </div>
  )

  return (
    <StepModal
      isOpen={isOpen}
      onClose={onClose}
      steps={[StepOne]}
      onFinish={handleFinish}
    />
  )
}

export default AddTask
