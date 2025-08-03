"use client";

import { Box, Button, useMediaQuery } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import LaunchIcon from "@mui/icons-material/Launch";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import React from "react";
import theme from "../../theme";
import { Story } from "../interface";
import Comments from "./Comments";
import { formatTime } from "../service";

interface StoryProps {
  story: Story;
  index: number;
}

export default function StoryItem({ story, index }: StoryProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState<boolean>(false);

  const boxBaseStyles = {
    pt: 1,
    pb: 1,
    pl: 2,
    pr: 2,
    border: "1px solid",
    borderRadius: 2,
    borderColor: "rgba(243 243 243 / 0.5)",
  };

  return (
    <ListItem
      key={story.id}
      sx={{
        p: 0,
        mb: isMobile ? 1 : 0,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "stretch",
        }}
      >
        <Button
          component={Link}
          href={story.url}
          target="_blank"
          rel="noreferrer"
          underline="none"
          sx={{
            ...boxBaseStyles,
            m: 0,
            flex: 1,
            display: "flex",
            alignItems: "stretch",
            textTransform: "none",
            fontSize: "1rem",
            "&:visited": {
              color: "rgba(128, 128, 128, 0.7)",
              borderColor: "rgba(128, 128, 128, 0.3)",
            },
            "&:visited .MuiSvgIcon-root": {
              color: "rgba(128, 128, 128, 0.7)",
            },
          }}
        >
          <span
            style={{
              textAlign: "right",
              width: "40px",
              display: "inline-block",
              flexShrink: 0,
            }}
          >
            {index + 1}.&nbsp;
          </span>
          <Box flex={1}>
            <span style={{ wordBreak: "break-word" }}>{story.title}</span>
            <span
              style={{
                color: "rgba(243 243 243 / 0.5)",
                fontSize: "0.75rem",
                display: "block",
              }}
            >
              {story.score} points by {story.by} {formatTime(story.time)} ago
            </span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <LaunchIcon />
          </Box>
        </Button>
        {story.descendants !== undefined && (
          <Button
            sx={{
              ...boxBaseStyles,
              mt: isMobile ? 1 : 0,
              ml: isMobile ? 0 : 1,
              borderColor:
                story.descendants == 0
                  ? "rgba(128, 128, 128, 0.3)"
                  : "rgba(243 243 243 / 0.5)",
            }}
            disabled={story.descendants == 0}
            onClick={() => setOpen(!open)}
          >
            <ChatIcon />
            <span
              style={{
                textAlign: "right",
                display: "inline-block",
                width: "52px",
                flex: 1,
              }}
            >
              {story.descendants}
            </span>
          </Button>
        )}
      </Box>
      <Box
        sx={{
          ...boxBaseStyles,
          width: "100%",
          visibility: open ? "visible" : "hidden",
          p: 0,
          mb: open ? 1 : 0,
        }}
      >
        <Comments item_ids={story.kids} open={open} />
      </Box>
    </ListItem>
  );
}
