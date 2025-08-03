"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { get_top_stories, get_item } from "./service";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import PageWrapper from "../(components)/PageWrapper";
import React from "react";
import StoryItem from "./(components)/StoryItem";
import { Story } from "./interface";

export default function HackerNews() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [topStories, setTopStories] = React.useState<Story[]>([]);

  React.useEffect(() => {
    get_top_stories()
      .then((stories) => {
        stories.slice(0, 30).forEach(async (id: number) => {
          const story = await get_item(id);
          setTopStories((prevStories) => [...prevStories, story]);
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper title="HACKER NEWS" subTitle={true}>
      <Typography sx={{ mb: 2 }}>
        (source:{" "}
        <Link
          href="https://news.ycombinator.com/news"
          target="_blank"
          rel="noreferrer"
          sx={{ overflowWrap: "break-word" }}
        >
          {" "}
          https://news.ycombinator.com/news
        </Link>
        )
      </Typography>
      <List>
        {topStories.map((story, index) => (
          <StoryItem key={story.id} story={story} index={index} />
        ))}
      </List>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <CircularProgress />
        </Box>
      )}
    </PageWrapper>
  );
}
