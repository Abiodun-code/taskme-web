// import { useState } from "react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu"
// import { ChevronDown } from "lucide-react"

// type DaySelectorProps = {
//   label?: string
//   days: number[]
//   defaultValue?: number
//   onSelect: (day: number) => void
// }

// export function DaySelector({
//   label = "Select Days",
//   days,
//   defaultValue,
//   onSelect,
// }: DaySelectorProps) {
//   const [selected, setSelected] = useState<number | undefined>(defaultValue)

//   const handleSelect = (day: number) => {
//     setSelected(day)
//     onSelect(day)
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         className="px-4 py-3 flex items-center gap-3 rounded-3xl border text-gray700 bg-white shadow-sm cursor-pointer font-inter"
//       >
//         {selected ? `Last ${selected} days` : label}
//         <ChevronDown/>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="rounded-lg bg-white shadow-md w-full">
//         <DropdownMenuLabel className="font-medium font-inter">Choose Period</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {days.map((day) => (
//           <DropdownMenuItem
//             key={day}
//             onClick={() => handleSelect(day)}
//             className="cursor-pointer font-inter"
//           >
//             {day} days
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
