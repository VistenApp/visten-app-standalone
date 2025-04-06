'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-zen-dots)',
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#0C0C0C',
    }
  },
});

export default theme;
