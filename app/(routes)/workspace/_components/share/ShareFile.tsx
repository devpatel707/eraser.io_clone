
"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, X } from "lucide-react";

const SERVICE_ID = "service_sjufd5y";
const TEMPLATE_ID = "template_5767dyh";
const PUBLIC_KEY = "2iq81JPr8vEhLuriJ";

const ShareFile = () => {
  const [email, setEmail] = useState("");
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);

  // Get the file link from the current URL
  const fileLink = window.location.href;
  const fileId = encodeURIComponent(fileLink); // Encode to make it safe for storage keys

  // Get logged-in user info from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const author = {
    name: loggedInUser.name || "Unknown User",
    email: loggedInUser.email || "No Email Available",
  };

  // Function to load invited users from localStorage when fileId changes
  const loadInvitedUsers = () => {
    const storedInvitedUsers = JSON.parse(localStorage.getItem("invitedUsers") || "{}");
    setInvitedUsers(storedInvitedUsers[fileId] || []);
  };

  // Load invited users whenever fileId changes (i.e., when switching files)
  useEffect(() => {
    loadInvitedUsers();
  }, [fileId]);

  // Function to save invited users to localStorage
  const saveInvitedUsers = (updatedUsers: string[]) => {
    const storedInvitedUsers = JSON.parse(localStorage.getItem("invitedUsers") || "{}");
    storedInvitedUsers[fileId] = updatedUsers;
    localStorage.setItem("invitedUsers", JSON.stringify(storedInvitedUsers));
  };

  // Function to copy link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileLink)
      .then(() => alert("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  // Function to invite a user and persist in local storage
  const handleInvite = async () => {
    if (email.trim() === "" || invitedUsers.includes(email)) return;

    try {
      const templateParams = {
        to_email: email,
        from_name: author.name,
        from_email: author.email,
        file_link: fileLink,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      alert(`Invitation sent to ${email} successfully!`);

      const updatedUsers = [...invitedUsers, email];
      setInvitedUsers(updatedUsers);
      saveInvitedUsers(updatedUsers); // Persist in local storage
      setEmail("");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send invitation. Please try again.");
    }
  };

  // Function to remove an invited user
  const handleRemoveUser = (userToRemove: string) => {
    const updatedUsers = invitedUsers.filter((user) => user !== userToRemove);
    setInvitedUsers(updatedUsers);
    saveInvitedUsers(updatedUsers); // Persist updated list in local storage
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-md flex items-center bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5">
          Share
          <Copy size={16} className="ml-2" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-neutral-900 text-white border border-neutral-700 rounded-lg shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Share File</DialogTitle>
        </DialogHeader>

        {/* Copy Link Section */}
        <div className="flex justify-between items-center p-3 bg-neutral-800 rounded-md mb-4">
          <span className="text-sm font-medium">Copy Link</span>
          <div className="flex items-center gap-2">
            <span className="text-sm truncate max-w-[200px]">{fileLink}</span>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} className="hover:bg-neutral-700">
              <Copy size={16} />
            </Button>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4 mb-6">
          <p className="text-sm font-medium">Settings</p>
          <select className="w-full bg-neutral-800 p-2 rounded text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Team File</option>
            <option>Private File</option>
          </select>
          <select className="w-full bg-neutral-800 p-2 rounded text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Anyone with the link can Edit</option>
            <option>Anyone with the link can View</option>
          </select>
        </div>

        {/* Invite Users */}
        <div className="space-y-4 mb-6">
          <p className="text-sm font-medium">Invite</p>
          <div className="flex gap-2">
            <Input
              placeholder="Email address or name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleInvite} variant="outline" className="bg-neutral-700 text-white hover:bg-neutral-600">
              Invite
            </Button>
          </div>
        </div>

        {/* Invited Users List */}
        {invitedUsers.length > 0 && (
          <div className="p-3 bg-neutral-800 rounded-md mb-6">
            <p className="text-sm font-medium mb-2">Invited Users</p>
            <ul className="text-xs text-gray-400">
              {invitedUsers.map((user, index) => (
                <li key={index} className="text-white flex items-center justify-between">
                  {user}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveUser(user)}
                    className="hover:bg-neutral-700"
                  >
                    <X size={14} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Author Section */}
        <div className="p-3 bg-neutral-800 rounded-md">
          <p className="text-sm font-medium">{author.name}</p>
          <p className="text-xs text-gray-400">{author.email}</p>
          <span className="text-xs bg-neutral-700 px-2 py-1 rounded mt-1 inline-block">Author</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareFile;
