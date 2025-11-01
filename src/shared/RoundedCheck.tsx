// import React from "react";
// import type { LucideIcon } from "lucide-react";

// interface RoundedCheckProps {
//   label?: string;
//   checked?: boolean;
//   onChange?: (checked: boolean) => void;
//   size?: "sm" | "md" | "lg"; // checkbox size
//   color?: string; // Tailwind color (e.g. "purple-600", "blue-500")
//   icon?: LucideIcon; // lucide-react icon component
// }

// const sizeMap = {
//   sm: "w-4 h-4 text-[10px]",
//   md: "w-6 h-6 text-[12px]",
//   lg: "w-8 h-8 text-[14px]",
// };

// const RoundedCheck = ({
//   label,
//   checked = false,
//   onChange,
//   size = "md",
//   color = "purple-600",
//   icon: Icon,
// }: RoundedCheckProps) => {
//   return (
//     <label className="flex items-center cursor-pointer space-x-3">
//       {/* Hidden native checkbox */}
//       <input
//         type="checkbox"
//         className="sr-only peer"
//         checked={checked}
//         onChange={(e) => onChange?.(e.target.checked)}
//       />

//       {/* Custom rounded checkbox */}
//       <div
//         className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out
//           ${checked ? `border-blue500` : "border-gray-400"}
//           bg-white ${sizeMap[size]}
//         `}
//       >
//         {/* Show icon only when checked */}
//         {checked && Icon && (
//           <Icon
//             className="size-48 text-blue500 transition-all duration-200 ease-in-out"
//           />
//         )}
//       </div>

//       {/* Text label */}
//       {label && (
//         <span className="text-sm text-gray-700 dark:text-gray-200 select-none">
//           {label}
//         </span>
//       )}
//     </label>
//   );
// };

// export default RoundedCheck;
