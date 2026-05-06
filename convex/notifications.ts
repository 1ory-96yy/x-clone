import { query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";
// import { v } from "convex/values";

export const getNotifications = query({
  handler: async (ctx) => {
    const currentUser = await getAuthenticatedUser(ctx);

    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_receiver", (q) => q.eq("receiverId", currentUser._id))
      .order("desc")
      .collect();

    if (notifications.length === 0) return [];

    return await Promise.all(
      notifications.map(async (notification) => {
        const sender = await ctx.db.get(notification.senderId);

        const post = notification.postId
          ? await ctx.db.get(notification.postId)
          : null;

        const comment =
          notification.type === "comment" && notification.commentId
            ? await ctx.db.get(notification.commentId)
            : null;

        return {
          ...notification,
          sender: sender
            ? {
                _id: sender._id,
                username: sender.username,
                image: sender.image,
              }
            : null,
          post,
          comment: comment?.content ?? null,
        };
      }),
    );
  },
});
