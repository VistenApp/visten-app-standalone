'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-zen-dots)',
  },
  palette: {
    mode: 'dark',
  },
});

export default theme;
