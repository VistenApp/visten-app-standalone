import Typographie from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <Box sx={{ textAlign: "center"}}>
      <Typographie variant="h3" component="h3">
        Welcome to Visten (ㆆ _ ㆆ)
      </Typographie>
      <Button variant="outlined" href="/login" sx={{ mt: 5 }}>
        Login
      </Button>
    </Box>
  );
}
