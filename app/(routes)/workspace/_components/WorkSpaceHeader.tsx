// // "use client";
// // import { cn } from "@/lib/utils";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";

// // import {
// //   Archive,
// //   Github,
// //   Info,
// //   LayoutDashboard,
// //   Link2,
// //   MoreHorizontal,
// //   Save,
// // } from "lucide-react";
// // import Link from "next/link";
// // import React from "react";
// // import { toast } from "sonner";

// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";

// // const WorkSpaceHeader = ({
// //   Tabs,
// //   setActiveTab,
// //   activeTab,
// //   onSave,
// //   file,
// // }: any) => {
// //   return (
// //     <div className="border-b  border-neutral-800 h-12 flex items-center px-4 w-full">
// //       {/* file name portion */}
// //       <div className="flex space-x-2 items-center justify-start w-full">
// //         <Link href="/dashboard" className="flex space-x-2 items-center  ">
// //           <img src="/logo.svg" alt="logo" className="w-8 h-8" />
// //           <div>
// //             <h1 className="text-sm font-medium">
// //               {file ? file.fileName : "Untitled"}
// //             </h1>
// //           </div>
// //         </Link>
// //         <div>
// //           <DropdownMenu>
// //             <DropdownMenuTrigger className="rounded-sm hover:bg-neutral-700 outline-none hover:text-white cursor-pointer p-1">
// //               <MoreHorizontal size={16} />
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent className="bg-neutral-800 ml-8 text-white  border-neutral-600">
// //               <DropdownMenuItem className="cursor-pointer text-xs focus:bg-neutral-700 focus:text-white">
// //                 <Archive size={16} className="mr-2" />
// //                 Move to Archive
// //               </DropdownMenuItem>
// //               <DropdownMenuItem className="cursor-pointer focus:bg-neutral-700 focus:text-white">
// //                 <Link className="flex items-center text-xs" href="/dashboard">
// //                   <LayoutDashboard size={16} className="mr-2" />
// //                   Go To Dashboard
// //                 </Link>
// //               </DropdownMenuItem>
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //         </div>
// //       </div>

// //       {/* tabs */}
// //       <div>
// //         <div className="border border-neutral-600 rounded">
// //           <div className="flex w-full items-center">
// //             {
// //               // tabs
// //               Tabs.map((tab: any) => (
// //                 <div
// //                   key={tab.name}
// //                   onClick={() => setActiveTab(tab.name)}
// //                   className={cn(
// //                     " cursor-pointer w-24 text-sm text-center hover:bg-neutral-700 px-2 py-1",
// //                     {
// //                       "bg-neutral-700 text-white": tab.name === activeTab,
// //                     },
// //                     {
// //                       "border-r border-neutral-500":
// //                         tab.name !== Tabs[Tabs.length - 1].name,
// //                     }
// //                   )}
// //                 >
// //                   <h1 className="text-sm font-medium">{tab.name}</h1>
// //                 </div>
// //               ))
// //             }
// //           </div>
// //         </div>
// //       </div>

// //       {/* right most */}
// //       <div className="w-full space-x-4  flex items-center  justify-end">
        
// //         <div
// //           onClick={() => onSave()}
// //           className="rounded-sm flex text-sm items-center bg-blue-700 hover:bg-blue-800 hover:text-white cursor-pointer px-2 py-1"
// //         >
// //           Save
// //           <Save size={20} className="ml-2"/>
// //         </div>
// //         <div
// //           onClick={() => {
// //             navigator.clipboard.writeText(
// //               `${window.location.origin}/workspace/${file._id}`
// //             );
// //             toast.success("Link Copied");
// //           }}
// //           className="rounded-sm flex text-sm items-center bg-blue-700 hover:bg-blue-800 hover:text-white cursor-pointer px-2 py-1"
// //         >
// //           Share
// //           <Link2 size={16} className="ml-2" />
// //         </div>
// //         <Popover>
// //           <PopoverTrigger asChild>
// //             <div className="rounded-sm hover:bg-neutral-700 hover:text-white cursor-pointer p-1">
// //               <Info size={16} />
// //             </div>
// //           </PopoverTrigger>
// //           <PopoverContent className="w-80 bg-neutral-800 text-white border-neutral-700">
// //             <div className="grid gap-4">
// //               <div className="space-y-2">
// //                 <h1 className="text-sm font-semibold">Info</h1>
// //                 <p className="text-xs text-neutral-400">
// //                   This is just a clone of eraser, made with nextjs and
// //                   tailwindcss
// //                 </p>
// //               </div>
// //             </div>
// //           </PopoverContent>
// //         </Popover>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WorkSpaceHeader;



// "use client";

// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import {
//   Archive,
//   Info,
//   LayoutDashboard,
//   Link2,
//   MoreHorizontal,
//   Save,
// } from "lucide-react";
// import Link from "next/link";
// import { toast } from "sonner";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"; // ✅ Import Popover
// import ShareFile from "./share/ShareFile"; // ✅ Import ShareFile component

// const WorkSpaceHeader = ({ Tabs, setActiveTab, activeTab, onSave, file }: any) => {
//   return (
//     <div className="border-b border-neutral-800 h-12 flex items-center px-4 w-full">
//       {/* File name portion */}
//       <div className="flex space-x-2 items-center justify-start w-full">
//         <Link href="/dashboard" className="flex space-x-2 items-center">
//           <img src="/logo.svg" alt="logo" className="w-8 h-8" />
//           <div>
//             <h1 className="text-sm font-medium">
//               {file ? file.fileName : "Untitled"}
//             </h1>
//           </div>
//         </Link>
//         <div>
//           <button className="rounded-sm hover:bg-neutral-700 p-1">
//             <MoreHorizontal size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div>
//         <div className="border border-neutral-600 rounded">
//           <div className="flex w-full items-center">
//             {Tabs.map((tab: any) => (
//               <div
//                 key={tab.name}
//                 onClick={() => setActiveTab(tab.name)}
//                 className={cn(
//                   "cursor-pointer w-24 text-sm text-center hover:bg-neutral-700 px-2 py-1",
//                   { "bg-neutral-700 text-white": tab.name === activeTab },
//                   { "border-r border-neutral-500": tab.name !== Tabs[Tabs.length - 1].name }
//                 )}
//               >
//                 <h1 className="text-sm font-medium">{tab.name}</h1>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right most buttons */}
//       <div className="w-full space-x-4 flex items-center justify-end">
//         <button
//           onClick={onSave}
//           className="rounded-sm flex text-sm items-center bg-blue-700 hover:bg-blue-800 hover:text-white cursor-pointer px-2 py-1"
//         >
//           Save
//           <Save size={20} className="ml-2" />
//         </button>

//         {/* ✅ Popover for Share File */}
//         <Popover>
//   <PopoverTrigger asChild>
//     <button className="rounded-sm flex text-sm items-center bg-blue-700 hover:bg-blue-800 hover:text-white cursor-pointer px-2 py-1">
//       Share
//       <Link2 size={16} className="ml-2" />
//     </button>
//   </PopoverTrigger>
//   <PopoverContent className="w-80 bg-neutral-900 text-white border-neutral-700 shadow-lg translate-x-[-20px]">
//     <ShareFile file={file} />
//   </PopoverContent>
// </Popover>


//       </div>
//     </div>
//   );
// };

// export default WorkSpaceHeader;


"use client";

import { MoreHorizontal, Save } from "lucide-react";
import Link from "next/link";
import ShareFile from "./share/ShareFile";

const WorkSpaceHeader = ({ Tabs, setActiveTab, activeTab, onSave, file }: any) => {
  return (
    <div className="border-b border-neutral-800 h-12 flex items-center px-4 w-full">
      
      {/* File Name */}
      <div className="flex space-x-2 items-center justify-start w-full">
        <Link href="/dashboard" className="flex space-x-2 items-center">
          <img src="/logo.svg" alt="logo" className="w-8 h-8" />
          <h1 className="text-sm font-medium">{file ? file.fileName : "Untitled"}</h1>
        </Link>
        <button className="rounded-sm hover:bg-neutral-700 p-1">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="border border-neutral-600 rounded overflow-hidden">
        <div className="flex w-full items-center">
          {Tabs.map((tab: any, index: number) => (
            <div
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`cursor-pointer w-24 text-sm text-center hover:bg-neutral-700 px-2 py-1 ${
                tab.name === activeTab ? "bg-neutral-700 text-white" : ""
              } ${index !== Tabs.length - 1 ? "border-r border-neutral-500" : ""}`}
            >
              <h1 className="text-sm font-medium">{tab.name}</h1>
            </div>
          ))}
        </div>
      </div>

      {/* Right-Side Buttons */}
      <div className="w-full space-x-4 flex items-center justify-end">
        {/* Save Button */}
        <button
          onClick={onSave}
          className="rounded-md flex items-center bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5"
        >
          Save
          <Save size={20} className="ml-2" />
        </button>

        {/* Share Modal */}
        <ShareFile file={file} />
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
