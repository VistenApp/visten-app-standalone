'use client';
import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
// import HomeIcon from '@mui/icons-material/Home';
// import TvIcon from '@mui/icons-material/Tv';
import UserMenu from './UserMenu';
// import VideocamIcon from '@mui/icons-material/Videocam';

export default function Navbar() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 3,
      mt: 3,
    }}>
      <Button
        href="/"
        disableRipple
        sx={{
          '&:hover': { backgroundColor: 'transparent' },
          '&:active': { backgroundColor: 'transparent' }
        }}
      >
        <Typography variant="h4">
          VISTEN
        </Typography>
      </Button>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button href="/poke-manager">
          <CatchingPokemonIcon />
          Poke Manager
        </Button>
        {/* <Button href="/show-tracker">
          <TvIcon />
          Show Tracker
        </Button>
        <Button href="/film-picker">
          <VideocamIcon />
          Film Picker
        </Button> */}
        <UserMenu />
      </Box>
    </Box>
  );
};