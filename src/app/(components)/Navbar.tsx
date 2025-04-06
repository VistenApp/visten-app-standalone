'use client';
import { Box, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TvIcon from '@mui/icons-material/Tv';
import UserMenu from './UserMenu';
import VideocamIcon from '@mui/icons-material/Videocam';

const Navbar = () => {
  const pathname = usePathname();

  const getActiveTabValue = () => {
    const paths = [
      '/',
      '/poke-manager',
      '/show-manager',
      '/film-picker',
    ]
    const index = paths.indexOf(pathname);
    if (index !== -1) {
      return index;
    }
    return 0;
  };

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(getActiveTabValue());
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 5,
      justifyContent: 'space-between' 
    }}>
      <Button href="/">
        <HomeIcon />
        Home
      </Button>
      <Button href="/">
        <CatchingPokemonIcon />
        Poke Manager
      </Button>
      <Button href="/">
        <TvIcon />
        Show Manager
      </Button>
      <Button href="/">
        <VideocamIcon />
        Film Picker
      </Button>
      <UserMenu />
    </Box>
  );
};

export default Navbar;