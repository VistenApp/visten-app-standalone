'use client';

import { Box, Button, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { get_top_stories, get_item } from './service';
import ChatIcon from '@mui/icons-material/Chat';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PageWrapper from '../(components)/PageWrapper';
import React from 'react';
import theme from '../theme';

export default function HackerNews() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = React.useState<boolean>(true);
  const [topStories, setTopStories] = React.useState<any[]>([]);

  const boxBaseStyles = {
    pt: 1,
    pb: 1,
    pl: 2,
    pr: 2,
    border: "1px solid",
    borderRadius: 2
  };

  React.useEffect(() => {
    get_top_stories().then((stories) => {
      stories.slice(0,30).forEach(async (id: number) => {
        const story = await get_item(id)
        setTopStories(prevStories => [...prevStories, story])
      });
    }).finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper title="HACKER NEWS" subTitle={true}>
      <Typography sx={{ mb: 2 }}>
        (source: <Link href="https://news.ycombinator.com/news" target="_blank" rel="noreferrer" sx={{ overflowWrap: "break-word" }}> https://news.ycombinator.com/news</Link>)
      </Typography>
      <List>
        {topStories.map((story, index) => (
          <ListItem
            id={story.id}
            key={story.id}
            alignItems="flex-start"
            sx={{
              textAlign: 'left',
              mb: 1.5,
              p: 0,
              gap: 1,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: 'stretch'
            }}
          >
            <Box sx={{ ...boxBaseStyles, display: "flex", alignItems: 'stretch', flex: 1 }}>
              <span style={{ textAlign: "right", width: "40px", display: "inline-block", flexShrink: 0 }}>
                {index + 1}.&nbsp;
              </span>
              <span style={{ wordBreak: "break-word", flex: 1 }}>
                {story.title}
              </span>
            </Box>
            <Box sx={{ gap: 1, display: "flex", mb: isMobile ? 1 : 0 }}>
              {story.descendants !== undefined &&
                <Button sx={{ ...boxBaseStyles, flex: 1 }}>
                  <Link href="#" underline="none" sx={{ display: "flex" }}>
                    <ChatIcon sx={{ verticalAlign: 'middle' }} />
                    <span style={{ textAlign:"right", display: "inline-block", width: "52px" , flex: 1 }}>{story.descendants}</span>
                  </Link>
                </Button>
              }
              <Button sx={{ ...boxBaseStyles, flex: story.descendants !== undefined ? 0 : 1 }}>
                <Link href={story.url} target="_blank" rel="noreferrer" underline="none">
                  <LaunchIcon sx={{ verticalAlign: 'middle' }} />
                </Link>
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
      {loading &&
      <Box sx={{  width: "100%"  }}>
        <CircularProgress />
      </Box>}
    </PageWrapper>
  );
}
