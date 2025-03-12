"use client";
import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "../../dashboard/_components/DashboardTable";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import jsPDF from "jspdf";

const Canvas = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) => {
  const [whiteBoard, setWhiteBoard] = useState<any>();

  useEffect(() => {
    whiteBoard && saveWhiteboard();
  }, [onSaveTrigger]);

  const updateWhiteBoard = useMutation(api.files.updateWhiteboard);

  const saveWhiteboard = () => {
    updateWhiteBoard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoard),
    })
      .then(() => {
        toast.success("Canvas saved");
      })
      .catch(() => {
        toast.error("Error saving canvas");
      });
  };

  const exportAsPDF = () => {
    if (!whiteBoard || whiteBoard.length === 0) {
      toast.error("No content to export!");
      return;
    }

    const pdf = new jsPDF();
    pdf.text("Exported Canvas", 10, 10);
    pdf.save("canvas.pdf");
    toast.success("Exported as PDF");
  };

  return (
    <>
      <div className="h-full w-full">
        <Excalidraw
          theme="dark"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          UIOptions={{
            canvasActions: {
              loadScene: false,
              saveAsImage: true,
              toggleTheme: false,
            },
          }}
          onChange={(excaliDrawElements) => {
            setWhiteBoard(excaliDrawElements);
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.Item onSelect={exportAsPDF}>📄   Export as PDF</MainMenu.Item>
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Hints.HelpHint />
          </WelcomeScreen>
        </Excalidraw>

        {/* UI Update: Rearranged Export PDF and Canvas Background */}
        <div className="p-4 bg-gray-900 text-white rounded-md mt-4">
          <h3 className="text-lg font-semibold mb-4">Canvas Options</h3>
          <div className="flex flex-col gap-2">
            <div className="w-full p-2 bg-gray-800 hover:bg-gray-700 rounded">
              Reset the canvas
            </div>
            <div className="w-full p-2 bg-gray-800 hover:bg-gray-700 rounded">
              Export image... <span className="text-sm text-gray-400">Ctrl+Shift+E</span>
            </div>
            <button
              className="w-full text-left p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              onClick={exportAsPDF}
            >
              PDF
            </button>
            <div className="w-full p-2 bg-gray-800 hover:bg-gray-700 rounded">
              Canvas background
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;

