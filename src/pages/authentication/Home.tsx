import { TopTitle } from "../../utils/TopTittle"
import { useState } from "react"
import type {Task, Column} from "../../types"
import ColumnDivide from "../../components/ui/Column"
import { DndContext, DragEndEvent } from "@dnd-kit/core"

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
      <div className="flex gap-8 w-full items-start">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column)=>(
          <ColumnDivide 
          key={column.id} 
          column={column} 
          tasks={tasks.filter((task) => task.status === column.id)}
        />
        ))}
        </DndContext>
      </div>
    </div>
  )
}

export default Home