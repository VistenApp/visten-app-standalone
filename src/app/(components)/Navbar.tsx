'use client';
import { Box, Button, Menu, MenuItem, styled, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import UserMenu from './UserMenu';
import theme from '../theme';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArticleIcon from '@mui/icons-material/Article';

export const StyledMenuItem = styled(MenuItem)({
  padding: 0
});

export const MenuItemButton = styled(Button)({
  height: '48px',
  width: '100%',
  paddingLeft: 16,
  paddingRight: 16
});


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
      {isMobile ? (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
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
              <StyledMenuItem sx={{ p: 0 }}>
                <MenuItemButton href="/hacker-news">
                  <ArticleIcon />
                  Hacker News
                </MenuItemButton>
              </StyledMenuItem>
              <StyledMenuItem sx={{ p: 0 }}>
                <MenuItemButton href="/poke-manager">
                  <CatchingPokemonIcon />
                  Poke Manager
                </MenuItemButton>
              </StyledMenuItem>
              <StyledMenuItem sx={{ p: 0 }}>
                <MenuItemButton href="/film-picker">
                  <VideocamIcon />
                  Film Picker
                </MenuItemButton>
              </StyledMenuItem>
              <StyledMenuItem sx={{ p: 0 }}>
                <MenuItemButton href="/shadow-17">
                  <SportsEsportsIcon />
                  Shadow 17
                </MenuItemButton>
              </StyledMenuItem>
            </Menu>
          </Box>
          <Box sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1
          }}>
            <Button href="/">
              <Typography variant="h6">
                VISTEN
              </Typography>
            </Button>
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <UserMenu />
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          </Box>
          <Box sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            display: 'flex',
            gap: 1,
          }}>
            <Button href="/hacker-news">
              <ArticleIcon />
              Hacker News
            </Button>
            <Button href="/poke-manager">
              <CatchingPokemonIcon />
              Poke Manager
            </Button>
            <Button href="/film-picker">
              <VideocamIcon />
              Film Picker
            </Button>
            <Button href="/shadow-17">
              <SportsEsportsIcon />
              Shadow 17
            </Button>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <UserMenu />
          </Box>
        </Box>
      )
      }
    </Box>
  );
};