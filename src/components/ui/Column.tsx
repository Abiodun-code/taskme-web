import {Column as ColumnType, Task} from "../../types"
import TaskCard from "./TaskCard"

type ColumnProp = {
  column: ColumnType,
  tasks: Task[],
}

const ColumnDivide = ({column, tasks}:ColumnProp) => {
  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div className="flex flex-1 flex-col gap-4">
        {tasks.map((task)=>(
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default ColumnDivide