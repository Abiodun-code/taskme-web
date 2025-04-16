import { useDroppable } from "@dnd-kit/core"
import { Column as ColumnType, Task } from "../../types"
import TaskCard from "./TaskCard"
import { FaChevronDown } from "react-icons/fa6"
import { useState } from "react"

type ColumnProp = {
  column: ColumnType,
  tasks: Task[],
}

const ColumnDivide = ({ column, tasks }: ColumnProp) => {
  const { setNodeRef } = useDroppable({ id: column.id })
  const [dropTask, setDropTask] = useState(true)

  return (
    <div className="flex w-[23.5rem] flex-col rounded-lg bg-neutral-50 border">
      <div className="flex items-center justify-between pb-2 border-b-2 border-b-neutral-200 p-4">
        <div className="flex items-center gap-2">
          <h2 className="font-inter font-semibold text-black">{column.title}</h2>
          <p className="">{tasks.length}</p>
        </div>
        <div
          className="cursor-pointer transition-transform"
          onClick={() => setDropTask(prev => !prev)}
        >
          <FaChevronDown
            className={`transition-transform ${dropTask ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {dropTask && (
        <div ref={setNodeRef} className="flex flex-col gap-4 p-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ColumnDivide
