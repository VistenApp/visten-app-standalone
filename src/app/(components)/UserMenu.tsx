import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import { StyledMenuItem, MenuItemButton } from './Navbar';

export default function UserMenu() {
  React.useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  if (isLoggedIn === null) {
    return <div style={{ width: "5ch" }}></div>;
  }

  return (
    <div>
      {isLoggedIn ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            id="user-button"
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <PersonIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
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
              <MenuItemButton href="/profile">
                PROFILE
              </MenuItemButton>
            </StyledMenuItem>
            <StyledMenuItem sx={{ p: 0 }}>
              <MenuItemButton onClick={handleLogout}>
                LOGOUT
              </MenuItemButton>
            </StyledMenuItem>
          </Menu>
        </Box>
      ) : (
        <div>
          <Button variant="text" href="/login">
            Log In
          </Button>
        </div>
      )}
    </div>
  );
}
