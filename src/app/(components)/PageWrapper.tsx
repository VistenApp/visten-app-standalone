// components/PageWrapper.js
import React from 'react';
import { Box, Typography, Alert } from '@mui/material';

interface PageWrapperProps {
  title: string;
  alertMessage?: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, alertMessage, children }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {alertMessage && (
        <Alert severity="error">{alertMessage}</Alert>
      )}
      {children}
    </Box>
  );
};

export default PageWrapper;
