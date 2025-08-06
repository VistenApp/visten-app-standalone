"use client";

import { Box, CircularProgress, Collapse, List } from "@mui/material";
import React from "react";
import { Comment } from "../interface";
import { get_item } from "../service";
import CommentItem from "./CommentItem";

interface CommentsProps {
  comments_count: number;
  item_ids: number[];
  open: boolean;
}

export default function Comments({
  comments_count,
  item_ids,
  open,
}: CommentsProps) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (comments_count && item_ids && open && loading) {
      const fetchComments = async () => {
        setComments([]);
        await new Promise((resolve) => setTimeout(resolve, 0));
        for (const id of item_ids) {
          if (signal.aborted) return;
          const comment: Comment = await get_item(id);
          if (
            !comment.dead &&
            !comment.deleted &&
            comment.text != "[delayed]"
          ) {
            setComments((prevComment: Comment[]) => [...prevComment, comment]);
          }
        }
        setLoading(false);
      };
      fetchComments();
    }

    return () => {
      controller.abort();
    };
  }, [comments_count, item_ids, open, loading]);

  return (
    <Collapse in={open} unmountOnExit>
      {comments_count ? (
        <>
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
        </>
      ) : (
        <Box sx={{ m: 1 }}>No comments yet.</Box>
      )}
    </Collapse>
  );
}
