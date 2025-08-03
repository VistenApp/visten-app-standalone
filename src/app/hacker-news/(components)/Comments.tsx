"use client";

import { Box, CircularProgress, Collapse, List } from "@mui/material";
import React from "react";
import { Comment } from "../interface";
import { get_item } from "../service";
import CommentItem from "./CommentItem";

interface CommentsProps {
  item_ids: number[];
  open: boolean;
}

export default function Comments({ item_ids, open }: CommentsProps) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    if (open && loading) {
      const loadComments = async () => {
        await fetchComments(item_ids, setComments);
        setLoading(false);
      };
      loadComments();
    }
  }, [open, item_ids, loading]);
  return (
    <Collapse in={open} unmountOnExit>
      <List>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </List>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Collapse>
  );
}

async function fetchComments(
  ids: number[],
  set: React.Dispatch<React.SetStateAction<Comment[]>>
) {
  for (const id of ids) {
    const comment: Comment = await get_item(id);
    if (!comment.dead && !comment.deleted) {
      set((prevComment: Comment[]) => [...prevComment, comment]);
    }
  }
}
