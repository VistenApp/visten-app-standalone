"use client";

import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import React from "react";
import { Comment } from "../interface";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Comments from "./Comments";
import { formatTime } from "../service";

interface StoryProps {
  comment: Comment;
}

export default function CommentItem({ comment }: StoryProps) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <ListItem
      key={comment.id}
      sx={{ display: "inline-block", fontSize: "0.75rem" }}
    >
      <div style={{ color: "rgba(243 243 243 / 0.5)" }}>
        {comment.by} {formatTime(comment.time)} ago
      </div>
      <>
        <style>{`
                    .content-container p {
                    margin: 0;
                    }
                `}</style>
        <div
          className="content-container"
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      </>
      {comment.kids && (
        <>
          <Link
            component="button"
            sx={{
              display: "flex",
            }}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {comment.kids.length} replies
            </span>
          </Link>
          <Comments
            comments_count={comment.kids.length}
            item_ids={comment.kids}
            open={open}
          />
        </>
      )}
    </ListItem>
  );
}
