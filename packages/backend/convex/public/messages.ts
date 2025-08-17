import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";

export const create = action({
    args: {
        prompt: v.string(),
        threadId: v.string(),
         contactSessionId: v.id("contactSessions")
    },
     handler: async (ctx, args) => {
        const contactSession = await ctx.runQuery(
            internal.system.contactSession.getOne,
            {
                contactSessionId: args.contactSessionId
            }
        )
        if(!contactSession || contactSession.expiresAt <Date. now()) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Invalid session"
            })
        }
     }
})