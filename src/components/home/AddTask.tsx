import React, { useState } from 'react'
import StepModal from '../../shared/StepModal'
import CustomInput from '../../shared/Input'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/Store';
import { toast } from 'react-toastify';
import { addTask } from '../../services/store/authenticated/create-task/CreateTaskSlice';
import { addNotification } from '../../services/store/authenticated/notification/notification-slice';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase'; // adjust if needed

const AddTask = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const [emailInput, setEmailInput] = useState('')
  const [foundUser, setFoundUser] = useState<{ uid: string, email: string } | null>(null)
  const [assignedUsers, setAssignedUsers] = useState<{ uid: string, email: string }[]>([])

  const handleSearchUser = async () => {
    if (!emailInput.trim()) return;

    try {
      const q = query(collection(db, "users"), where("email", "==", emailInput.trim()))
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        toast.error("No user found with that email.")
        return
      }

      const doc = snapshot.docs[0]
      const user = { uid: doc.id, ...doc.data() } as { uid: string; email: string }

      // Prevent duplicates
      if (assignedUsers.some(u => u.uid === user.uid)) {
        toast.info("User already assigned.")
        return
      }

      setAssignedUsers(prev => [...prev, user])
      setEmailInput('')
      setFoundUser(null)
    } catch (error) {
      toast.error("Failed to search user.")
      console.error("Error searching user:", error)
    }
  }

  const handleRemoveUser = (uid: string) => {
    setAssignedUsers(prev => prev.filter(u => u.uid !== uid))
  }

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
        status: "TODO",
        assignedTo: assignedUsers.map(user => user.uid), // ✅ include assigned users
      })).unwrap()

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
      setAssignedUsers([])
      setEmailInput('')
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

      <div className="mt-4">
        <h2 className="font-semibold text-sm mb-2">Assign Users</h2>
        <div className="flex gap-2">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter email to assign"
            className="p-2 border border-gray-300 rounded w-full"
            disabled={loading}
          />
          <button
            onClick={handleSearchUser}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Add
          </button>
        </div>

        <ul className="mt-2 space-y-1">
          {assignedUsers.map(user => (
            <li key={user.uid} className="text-sm flex items-center justify-between bg-gray-100 px-3 py-1 rounded">
              {user.email}
              <button
                className="text-red-500 text-xs"
                onClick={() => handleRemoveUser(user.uid)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
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
