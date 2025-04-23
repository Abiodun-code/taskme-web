import { useState, useEffect } from "react"
import { TopTitle } from "../../utils/TopTittle"
import type { Task, Column } from "../../types"
import ColumnDivide from "../../components/home/Column"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { FaPlus } from "react-icons/fa"
import AddTask from "../../components/home/AddTask"
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore"
import useCurrentUser from "../../hooks/useCurrentUser"
import { db } from "../../services/firebase"
import { toast } from "react-toastify"
import Spinner from "../../components/ui/Spinner"

const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
]

const Home = () => {
  TopTitle('Home - TaskMe')

  const { user, isLoading } = useCurrentUser()
  const [tasks, setTasks] = useState<Task[]>([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[]
      setTasks(tasksData)
    })

    return () => unsubscribe()
  }, [user])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return;

    const taskId = active.id as string
    const newStatus = over.id as Task["status"]

    const taskToUpdate = tasks.find(task => task.id === taskId)
    if (!taskToUpdate) return;

    try {
      const taskRef = doc(db, "tasks", taskId)
      await updateDoc(taskRef, { status: newStatus })

      toast.success("Task updated!")
      
      // If moved to DONE, then auto-delete after 2 seconds
      if (newStatus === "DONE") {
        setTimeout(async () => {
          try {
            await deleteDoc(taskRef);
            toast.success("Task deleted after completion! 🎉");
          } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task");
          }
        }, 60000);
      }
    } catch (error) {
      console.error("Error updating task:", error)
      toast.error("Failed to update task")
    }
  }

  if (isLoading) {
    return <div className='absolute top-0 bottom-0 right-0 bg-black bg-opacity-25 flex justify-center items-center left-0'>
      <Spinner className='border-r-orange-400 border-l-blue-600 w-14 h-14' />
    </div>;
  }
  
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-6 w-full lg:items-start xl:justify-start lg:justify-start items-center justify-center xl:items-start">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <ColumnDivide
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-6 right-6 z-10 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors text-3xl"
      >
        <FaPlus size={'1.3rem'} />
      </button>

      {/* Modal */}
      <AddTask isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  )
}

export default Home
