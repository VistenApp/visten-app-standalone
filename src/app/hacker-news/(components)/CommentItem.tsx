"use client";

import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import React from "react";
import { Comment } from "../interface";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Comments from "./Comments";

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
          <Comments item_ids={comment.kids} open={open} />
        </>
      )}
    </ListItem>
  );
}

function formatTime(time: number) {
  const then = new Date(time * 1000);
  const minutes = Math.floor((Date.now() - then.getTime()) / 60000);
  if (minutes < 60) return minutes + " minutes";

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + " hours";

  const days = Math.floor(hours / 60);
  if (days < 60) return days + " days";
}
