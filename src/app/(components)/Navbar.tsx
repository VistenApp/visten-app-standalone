'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const getActiveTabValue = () => {
    const paths = {
      '/': 0,
      '/login': 1,
      '/profile': 1,
    }
    if (pathname in paths) {
      return paths[pathname as keyof typeof paths];
    }
    return 0;
  };

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(getActiveTabValue());
  }, [pathname]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("token")) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%" 
      sx={{ mb: 5 }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        role="navigation"
        centered
      >
        <Tab
          label="Home"
          icon={<HomeIcon />}
          iconPosition="start"
          component={Link}
          href="/"
        />
        {isLoggedIn ? (
          <Tab
            label="Profile"
            icon={<PersonIcon />}
            iconPosition="start"
            component={Link}
            href="/profile"
          />
        ) : (
          <Tab
            label="Login"
            component={Link}
            href="/login"
          />
        )}
      </Tabs>
    </Box>
  );
};

export default Navbar;