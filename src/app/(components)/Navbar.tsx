'use client';
import { Box, Button, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import UserMenu from './UserMenu';
import theme from '../theme';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
// import TvIcon from '@mui/icons-material/Tv';

export default function Navbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      {isMobile ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            id="user-button"
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuOutlinedIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Button href="/poke-manager">
                <CatchingPokemonIcon />
                Poke Manager
              </Button>
            </MenuItem>
            <MenuItem>
              <Button href="/film-picker">
                <VideocamIcon />
                Film Picker
              </Button>
            </MenuItem>
          </Menu>
          <UserMenu />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button href="/poke-manager">
            <CatchingPokemonIcon />
            Poke Manager
          </Button>
          <Button href="/film-picker">
            <VideocamIcon />
            Film Picker
          </Button>
          {/* <Button href="/show-tracker">
            <TvIcon />
            Show Tracker
          </Button> */}
          <UserMenu />
        </Box>
      )
      }
    </Box>
  );
};