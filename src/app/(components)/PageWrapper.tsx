// components/PageWrapper.js
import React from 'react';
import { Box, Typography, Alert } from '@mui/material';

interface PageWrapperProps {
  title: string;
  alertMessage?: string;
  children: React.ReactNode;
}

export default function PageWrapper({ title, alertMessage, children }: PageWrapperProps) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {alertMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>{alertMessage}</Alert>
      )}
      {children}
    </Box>
  );
};
