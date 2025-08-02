'use client';

import { Box, Typography } from '@mui/material';
import { get_top_stories, get_item } from './service';
import ChatIcon from '@mui/icons-material/Chat';
import LaunchIcon from '@mui/icons-material/Launch';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import PageWrapper from '../(components)/PageWrapper';
import React from 'react';

export default function HackerNews() {
  const [topStories, setTopStories] = React.useState<any[]>([]);

  React.useEffect(() => {
    get_top_stories().then((stories) => {
      stories.slice(0,30).forEach(async (id: number) => {
        const story = await get_item(id)
        setTopStories(prevStories => [...prevStories, story])
      });
    });
  }, []);

  return (
    <PageWrapper title="HACKER NEWS" subTitle={true}>
      <Typography sx={{mb: 2}}>
        (source: <Link href="https://news.ycombinator.com/news" target="_blank" rel="noreferrer"> https://news.ycombinator.com/news</Link>)
      </Typography>
      <List>
        {topStories.map((story, index) => (
          <ListItem id={story.id} key={story.id} alignItems="flex-start" sx={{textAlign: 'left', mb: 1.5, p: 0, gap: 1, display: "flex", alignItems: 'stretch'}}>
            <Box sx={{pt: 1, pb: 1, pl: 2, pr: 2, border: "1px solid", borderRadius: 2, display: "flex", alignItems: 'stretch', flex: 1}}>
              <span style={{textAlign:"right", width: "40px", display: "inline-block",flexShrink: 0}}>{index + 1}.&nbsp;</span>
              <Link href={story.url} target="_blank" rel="noreferrer" underline="none" sx={{justifyContent: "space-between"}}>
                {story.title}
                <LaunchIcon sx={{verticalAlign: 'middle', ml: 1}} />
              </Link>
            </Box>
            {/* {story.descendants !== undefined &&
              <Box sx={{pt: 1, pb: 1, pl: 2, pr: 2, border: "1px solid", borderRadius: 2, width: "110px"}}>
                <Link href="#" underline="none" sx={{display: "flex"}}>
                  <ChatIcon sx={{verticalAlign: 'middle'}} />
                  <span style={{textAlign:"right", display: "inline-block", flex: 1}}>{story.descendants}</span>
                </Link>
              </Box>
            } */}
          </ListItem>
        ))}
      </List>
    </PageWrapper>
  );
}
