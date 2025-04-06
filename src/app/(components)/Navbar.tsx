'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';
import { Box } from '@mui/material';

const Navbar = () => {
  const pathname = usePathname();

  const getActiveTabValue = () => {
    const paths = {
      '/': 0,
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
      </Tabs>
      <UserMenu />
    </Box>
  );
};

export default Navbar;