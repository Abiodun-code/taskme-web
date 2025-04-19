import { useDraggable } from "@dnd-kit/core"
import { Task } from "../../types"

type TaskCardProps = {
  task:Task
}
const TaskCard = ({task}:TaskCardProps) => {
  
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  } : undefined
  return (
    <div 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes} 
      className="cursor-grab rounded-lg bg-neutral-300 p-4 shadow-sm hover:shadow-md" style={style}>
      <h3 className="font-semibold font-inter text-black">{task.title}</h3>
      <p className="mt-2 text-base text-black font-league font-light">{task.description}</p>
    </div>
  )
}

export default TaskCard