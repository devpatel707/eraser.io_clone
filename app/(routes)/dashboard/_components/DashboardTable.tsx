"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Archive, Delete, Edit, MoreHorizontal } from "lucide-react";
import { FileListContext } from "@/app/_context/FileListContext";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api"; // Convex API

export interface FILE {
  _id: string;
  fileName: string;
  file: string;
  createdBy: string;
  _creationTime: string;
  _modifiedTime: string;
  archived: boolean;
  teamId: string;
  document: string;
  whiteboard: string;
}

const DashboardTable = () => {
  const { fileList } = useContext(FileListContext);
  const [fileList_, setFileList_] = useState<FILE[]>([]);
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const updateFileName = useMutation(api.files.renameFile);
  const toggleArchive = useMutation(api.files.toggleArchive);

  useEffect(() => {
    if (fileList) {
      setFileList_(fileList.filter((file) => !file.archived)); // Filter out archived files
    }
  }, [fileList]);

  // ✅ Restore Rename Function
  const handleRename = async (id: string) => {
    const newName = prompt("Enter new file name:");
    if (newName && newName.trim() !== "") {
      try {
        const updatedTime = new Date().toISOString(); // ✅ Use ISO format

        await updateFileName({ _id: id, fileName: newName });

        // Update local state to reflect new file name
        setFileList_((prevList) =>
          prevList.map((file) =>
            file._id === id ? { ...file, fileName: newName, _modifiedTime: updatedTime } : file
          )
        );

        console.log(`File ${id} renamed to ${newName}`);
      } catch (error) {
        console.error("Failed to rename file:", error);
      }
    }
  };


  const handleArchive = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await toggleArchive({ _id: id, archived: newStatus });

      // Remove archived files from the Dashboard view
      setFileList_((prevList) => prevList.filter((file) => file._id !== id));

      console.log(`File ${id} archived`);
    } catch (error) {
      console.error("Failed to update archive status:", error);
    }
  };

  return (
    <div className="mt-8 pl-2 pr-2">
      <Table className="border-none">
        <TableHeader>
          <TableRow className="border-white/40 mx-16 hover:bg-transparent">
            <TableHead className="pl-20 w-[300px]">Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Edited</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="pr-2 w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fileList_.length > 0 ? (
            fileList_.map((file) => (
              <TableRow
                onClick={() => {
                  router.push(`/workspace/${file._id}`);
                }}
                key={file._id}
                className="mx-16 hover:bg-white/10 cursor-pointer border-neutral-700 hover:text-white"
              >
                <TableCell className="font-medium pl-20">{file.fileName}</TableCell>
                <TableCell>{moment(file._creationTime).format("DD MMM YYYY")}</TableCell>
                <TableCell>{moment(file._modifiedTime || file._creationTime).format("DD MMM YYYY")}</TableCell>
                <TableCell className="w-[150px] text-sm">
                  <img
                    src={"avatar-01.png"}
                    alt="Author"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  />
                </TableCell>
                <TableCell className="pr-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="outline-none">
                      <div className="p-1 hover:bg-neutral-600 w-fit rounded-sm cursor-pointer">
                        <MoreHorizontal size={16} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-neutral-800 gap-1 rounded-lg text-white border-neutral-700 w-48 ml-4 mt-2">
                      {/* ✅ Add Rename Option */}
                      <DropdownMenuItem
                        className="cursor-pointer focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white"
                        onClick={() => handleRename(file._id)}
                      >
                        <Edit size={16} className="mr-2" />
                        Rename
                      </DropdownMenuItem>

                      {/* ✅ Archive File Option */}
                      <DropdownMenuItem
                        onClick={() => handleArchive(file._id, file.archived)}
                        className="cursor-pointer focus:bg-neutral-700 focus:text-white"
                      >
                        <Archive size={16} className="mr-2" />
                        Archive
                      </DropdownMenuItem>

                      {/* Delete Option (Not implemented yet) */}
                      <DropdownMenuItem className="cursor-pointer focus:bg-red-500 focus:text-white hover:bg-red-500 hover:text-white">
                        <Delete size={16} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                No files available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardTable;
