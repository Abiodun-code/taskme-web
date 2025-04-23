import React, { useState } from 'react'
import StepModal from '../../shared/StepModal'
import CustomInput from '../../shared/Input'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/Store';
import { toast } from 'react-toastify';
import { addTask } from '../../services/store/authenticated/create-task/CreateTaskSlice';
import { addNotification } from '../../services/store/authenticated/notification/notification-slice';
const AddTask = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFinish = async () => {
    if (!title.trim()) {
      toast.error("Title is required")
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required")
      return;
    }

    setLoading(true)
    try {
      await dispatch(addTask({
        title,
        description,
        status: "TODO", // Always add new task to TODO column
      })).unwrap()

      // ✅ Add a notification when task is successfully added
      dispatch(addNotification({
        id: Date.now(),
        message: `"${title}" added successfully!`,
        timestamp: new Date().toISOString(),
        type: 'success',
      }));

      toast.success("Task added successfully!")
      onClose()
      setTitle('')
      setDescription('')
    } catch (error) {
      toast.error(error as string || "Failed to add task")
    } finally {
      setLoading(false)
    }
  }

  const StepOne = (
    <div>
      <h1 className="text-xl font-semibold font-inter mb-4 pt-4">Add Task</h1>
      <CustomInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        disabled={loading}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="p-2 font-league text-lg font-light border border-gray-300 rounded-md w-full mt-2"
        rows={4}
        disabled={loading}
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
