'use client';
import React from 'react';
import Typographie from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
              This app is for private use only, you can&apos;t sign up sorry...
            </Typographie>
            <Button variant="outlined" href="/login" sx={{ mt: 5 }}>
              Login
            </Button>
          </div>
        )}
      </Box>
    </Box>
  );
}
