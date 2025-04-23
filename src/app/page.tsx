'use client';
import React from 'react';
import Typographie from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  React.useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ textAlign: "center", width: "100%", mt: 30 }}>
        <Typographie variant="h3">
          WELCOME TO VISTEN (ㆆ _ ㆆ)
        </Typographie>
        {!isLoggedIn && (
          <div>
            <Typographie variant="h5" sx={{ mt: 3 }}>
              This is an app where I put random features I thought of...
            </Typographie>
            <Box sx={{
              mt: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2
            }}>
              <Button variant="outlined" href="/login">
                Login
              </Button>
              <Link href="/signup">Sign up</Link>
            </Box>
          </div>
        )}
      </Box>
    </Box>
  );
}
