import { TopTitle } from "../../utils/TopTittle"
import { useState } from "react"
import type {Task, Column} from "../../types"
import ColumnDivide from "../../components/home/Column"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { FaPlus } from "react-icons/fa";
import AddTask from "../../components/home/AddTask"

const COLUMNS:Column[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
]

const INITIAL_TASKS:Task[] = [
  {
    id:"1",
    title: "Research React",
    description: "Research React and its features",
    status: "TODO",
  },
  {
    id: "2",
    title: "Research Redux",
    description: "Research Redux and its features",
    status: "TODO",
  },
  {
    id:"3",
    title: "Design System",
    description: "Create component library and design system",
    status: "TODO",
  },
  {
    id:"4",
    title: "Build UI",
    description: "Build UI for the application",
    status: "IN_PROGRESS",
  },
  {
    id:"5",
    title: "API Integration",
    description: "Integrate API with the application",
    status: "IN_PROGRESS",
  },
  {
    id:"6",
    title: "Testing",
    description: "Test the application",
    status: "DONE",
  }
]
const Home = () => {

  TopTitle('Home - TaskMe')

  const[tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const [openModal, setOpenModal] = useState(false)

  const handleDragEnd = (event:DragEndEvent)=>{
    const {active, over} = event

    if(!over) return;

    const taskId = active.id as string
    const newStatus = over.id as Task["status"]

    setTasks(()=>
      tasks.map((task)=>
        task.id === taskId ? {...task, status: newStatus}: task
      )
    )
  }

  return (
    <div className="p-4">
      {tasks.length > 0 ?
        (<div className="flex flex-wrap gap-6 w-full lg:items-start xl:justify-start lg:justify-start items-center justify-center xl:items-start">
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
        ) : (
          <div className="flex items-center justify-center w-full">
            <h1 className="font-inter font-semibold text-2xl">No tasks available</h1>
          </div>
        )}
      {/* Floating Add Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-6 right-6 z-10 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors text-3xl"
      >
        <FaPlus size={'1.3rem'}/>
      </button>

      {/* Modal */}
        <AddTask isOpen={openModal} onClose={()=>setOpenModal(false)}/>
    </div>
  )
}

export default Home