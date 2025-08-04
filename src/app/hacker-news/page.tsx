"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { get_top_stories, get_item } from "./service";
import Link from "@mui/material/Link";
import PageWrapper from "../(components)/PageWrapper";
import React from "react";
import StoryItem from "./(components)/StoryItem";
import { Story } from "./interface";
import InfiniteScroll from "react-infinite-scroll-component";

export default function HackerNews() {
  const [topStories, setTopStories] = React.useState<Story[]>([]);
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const [storyIds, setStoryIds] = React.useState<number[]>([]);
  const [offset, setOffset] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    get_top_stories().then((stories) => {
      setTotalProducts(stories.length);
      setStoryIds(stories);
    });
  }, []);

  React.useEffect(() => {
    if (storyIds.length === 0) return;
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIds]);

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    const length = 25;
    storyIds.slice(offset, offset + length).forEach(async (id, index) => {
      try {
        const story = await get_item(id);
        setTopStories((prev) => [...prev, story]);
      } catch (err) {
        console.error("Failed to fetch story", id, err);
      } finally {
        if (index === length - 1) {
          setOffset((prev) => prev + length);
          setLoading(false);
        }
      }
    });
  };

  return (
    <PageWrapper title="HACKER NEWS" subTitle={true}>
      <Typography sx={{ mb: 2 }}>
        (source:{" "}
        <Link
          href={process.env.NEXT_PUBLIC_HACKER_NEWS_URL}
          target="_blank"
          rel="noreferrer"
          sx={{ overflowWrap: "break-word" }}
        >
          {" "}
          {process.env.NEXT_PUBLIC_HACKER_NEWS_URL}
        </Link>
        )
      </Typography>
      <InfiniteScroll
        dataLength={topStories.length}
        next={fetchData}
        hasMore={totalProducts > topStories.length}
        loader={
          <Box sx={{ width: "100%" }}>
            <CircularProgress />
          </Box>
        }
      >
        {topStories.map((story, index) => (
          <StoryItem key={story.id} story={story} index={index} />
        ))}
      </InfiniteScroll>
    </PageWrapper>
  );
}
