"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileListContext } from "@/app/_context/FileListContext";
import moment from "moment";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Undo, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export interface FILE {
  _id: string;
  fileName: string;
  createdBy: string;
  _creationTime: string;
  _modifiedTime?: string;
  archived: boolean;
  teamId: string;
  document: string;
  whiteboard: string;
  authorImage: string; // Added author image property
}

const ArchivePage = () => {
  const router = useRouter();
  const { fileList, setFileList } = useContext(FileListContext);
  const [archivedFiles, setArchivedFiles] = useState<FILE[]>([]);

  const unarchiveFile = useMutation(api.files.unarchiveFile);

  useEffect(() => {
    if (fileList) {
      setArchivedFiles(fileList.filter((file) => file.archived));
    }
  }, [fileList]);

  // Function to unarchive file
  const handleUnarchive = async (id: string) => {
    try {
      await unarchiveFile({ _id: id });

      setFileList((prevList: FILE[]) =>
        prevList.map((file) =>
          file._id === id ? { ...file, archived: false } : file
        )
      );

      console.log(`File ${id} unarchived successfully`);
    } catch (error) {
      console.error("Failed to unarchive file:", error);
    }
  };

  // Function to open workbook page
  const openWorkbook = (fileId: string) => {
    router.push(`/workbook/${fileId}`);
  };

  return (
    <div className="mt-8 pl-2 pr-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Archived Files</h2>
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </button>
      </div>
      <Table className="border-none">
        <TableHeader>
          <TableRow className="border-white/40 mx-16 hover:bg-transparent">
            <TableHead className="pl-6 w-[300px]">Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Edited</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="pr-2 w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {archivedFiles.length > 0 ? (
            archivedFiles.map((file) => (
              <TableRow
              onClick={() => {
                router.push(`/workspace/${file._id}`);
              }}
                key={file._id}
                className="hover:bg-white/10 border-neutral-700 cursor-pointer"
              >
                <TableCell className="pl-6 font-medium">{file.fileName}</TableCell>
                <TableCell>{moment(file._creationTime).format("DD MMM YYYY")}</TableCell>
                <TableCell>{moment(file._modifiedTime || file._creationTime).format("DD MMM YYYY")}</TableCell>
                <TableCell>
                <Image
  src={file.authorImage || "/avatar-01.png"} // ✅ Provide a default image
  alt="Author"
  width={32}
  height={32}
  className="rounded-full"
/>

                </TableCell>
                <TableCell className="pr-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="outline-none">
                      <div className="p-1 hover:bg-neutral-600 w-fit rounded-sm cursor-pointer">
                        <Undo size={16} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-neutral-800 gap-1 rounded-lg text-white border-neutral-700 w-48 ml-4 mt-2">
                      <DropdownMenuItem
                        className="cursor-pointer focus:bg-green-500 focus:text-white hover:bg-green-500 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnarchive(file._id);
                        }}
                      >
                        <Undo size={16} className="mr-2" />
                        Unarchive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                No archived files
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArchivePage;
