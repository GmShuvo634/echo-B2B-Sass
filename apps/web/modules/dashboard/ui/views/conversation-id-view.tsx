"use client";

import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "convex/react";

export const ConversationIdView = ({
  conversationId,
}: {
  conversationId: Id<"conversations">;
}) => {

    const conversation = useQuery(api.private.conversations.getOne, {
        conversationId
    })

    return (
        <div>
            {JSON.stringify(conversation)}
        </div>
    )
};
