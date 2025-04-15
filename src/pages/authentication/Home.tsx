import { title } from "process"
import { TopTitle } from "../../utils/TopTittle"
import { useState } from "react"
import type {Task, Column} from "../../types"
import ColumnDivide from "../../components/ui/Column"


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

  return (
    <div className="p-4">
      <div className="flex gap-8">
        {COLUMNS.map((column)=>(
          <ColumnDivide 
          key={column.id} 
          column={column} 
          tasks={tasks.filter((task) => task.status === column.id)}
        />
        ))}
      </div>
    </div>
  )
}

export default Home