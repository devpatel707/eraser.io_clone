import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const createNewFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archieved: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("files", args);
  },
});

export const getFiles = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, { document: args.document });
  },
});

export const updateWhiteboard = mutation({
  args: {
    _id: v.id("files"),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args._id, { whiteboard: args.whiteboard });
  },
});

export const getFilebyId = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args._id);
  },
});


export const renameFile = mutation({
  args: { _id: v.id("files"), fileName: v.string() }, // Accept file ID and new name
  handler: async (ctx, args) => {
    console.log("Renaming file:", args._id, "New name:", args.fileName);

    await ctx.db.patch(args._id, {
      fileName: args.fileName,
      _modifiedTime: Date.now(),  // ✅ Change _modifiedTime → modifiedTime
    });
  },
});


export const toggleArchive = mutation({
  args: { _id: v.id("files"), archived: v.boolean() }, // Accept file ID and new archived status
  handler: async (ctx, args) => {
    console.log("Toggling archive status for file:", args._id, "New status:", args.archived);

    await ctx.db.patch(args._id, {
      archived: args.archived, // ✅ Update the archive status
      modifiedTime: Date.now(), // ✅ Track when the file was archived/unarchived
    });
  },
});


export const unarchiveFile = mutation({
  args: { _id: v.id("files") },
  handler: async ({ db }, { _id }) => {
    await db.patch(_id, { archived: false });
  },
});