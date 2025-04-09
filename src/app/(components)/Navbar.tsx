'use client';
import { Box, Button } from '@mui/material';
import * as React from 'react';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import HomeIcon from '@mui/icons-material/Home';
import TvIcon from '@mui/icons-material/Tv';
import UserMenu from './UserMenu';
import VideocamIcon from '@mui/icons-material/Videocam';

export default function Navbar() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 5,
      mt: 5,
      justifyContent: 'space-between' 
    }}>
      <Button href="/">
        <HomeIcon />
        Home
      </Button>
      <Button href="/poke-manager">
        <CatchingPokemonIcon />
        Poke Manager
      </Button>
      <Button href="/show-manager">
        <TvIcon />
        Show Manager
      </Button>
      <Button href="/film-picker">
        <VideocamIcon />
        Film Picker
      </Button>
      <UserMenu />
    </Box>
  );
};