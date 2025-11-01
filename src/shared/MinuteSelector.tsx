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

// type MinuteSelectorProps = {
//   label?: string
//   minutes: number[] // e.g. [1, 15, 30, 60]
//   defaultValue?: number
//   onSelect: (minute: number) => void
// }

// export function MinuteSelector({
//   label = "Select Minutes",
//   minutes,
//   defaultValue,
//   onSelect,
// }: MinuteSelectorProps) {
//   const [selected, setSelected] = useState<number | undefined>(defaultValue)

//   const handleSelect = (minute: number) => {
//     setSelected(minute)
//     onSelect(minute)
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         className="px-4 py-3 flex items-center gap-3 rounded-3xl border text-gray700 bg-white shadow-sm cursor-pointer font-inter"
//       >
//         {selected ? `${selected < 60 ? selected + " min" : selected / 60 + " hr"}` : label}
//         <ChevronDown />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="rounded-lg bg-white shadow-md w-full">
//         <DropdownMenuLabel className="font-medium font-inter">Choose Interval</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {minutes.map((minute) => (
//           <DropdownMenuItem
//             key={minute}
//             onClick={() => handleSelect(minute)}
//             className="cursor-pointer font-inter"
//           >
//             {minute < 60 ? `${minute} minutes` : `${minute / 60} hour`}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
