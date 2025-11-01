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

// type SortOption = {
//   value: string
//   label: string
// }

// type SortBySelectorProps = {
//   label?: string
//   options: SortOption[]
//   defaultValue?: string
//   onSelect: (value: string) => void
// }

// export function SortBySelector({
//   label = "Sort By",
//   options,
//   defaultValue,
//   onSelect,
// }: SortBySelectorProps) {
//   const [selected, setSelected] = useState<string | undefined>(defaultValue)

//   const handleSelect = (value: string) => {
//     setSelected(value)
//     onSelect(value)
//   }

//   const selectedLabel =
//     options.find((opt) => opt.value === selected)?.label || label

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="px-4 py-3 flex items-center gap-3 rounded-3xl border text-gray700 bg-white shadow-sm cursor-pointer font-inter">
//         {selectedLabel}
//         <ChevronDown />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="rounded-lg bg-white shadow-md w-full">
//         <DropdownMenuLabel className="font-medium font-inter">
//           Choose Sorting
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {options.map((opt) => (
//           <DropdownMenuItem
//             key={opt.value}
//             onClick={() => handleSelect(opt.value)}
//             className="cursor-pointer font-inter"
//           >
//             {opt.label}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }
