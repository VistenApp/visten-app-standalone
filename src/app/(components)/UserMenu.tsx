import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';

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

  const handleProfile = () => {
    window.location.href = "/profile";
  }

  if (isLoggedIn === null) {
    return null;
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
            <MenuItem onClick={handleProfile}>PROFILE</MenuItem>
            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
          </Menu>
        </Box>
      ) : (
        <Button variant="text" href="/login">
          Login
        </Button>
      )}
    </div>
  );
}
