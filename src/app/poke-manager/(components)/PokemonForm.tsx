import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Rating, Typography } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import { add_needed_pokemon } from '../service';

interface FormDialogProps {
  extension: number;
  setAlertMessage: (message: string) => void;
  getPokemons: (extension: string) => void;
}

export default function PokemonForm({ extension, setAlertMessage, getPokemons }: FormDialogProps) {
  const [rating, setRating] = React.useState<number | null>(0);
  const [name, setName] = React.useState<string>("");

  function handleClick() {
    if (name === "") {
      setAlertMessage("Name is required");
      return;
    }
    if (rating === null || rating === 0) {
      setAlertMessage("Rating is required");
      return;
    }

    add_needed_pokemon(extension, name, rating).then(() => {
      getPokemons(extension.toString());
    }
    ).catch((error: Error) => {
      setAlertMessage(error.message);
    });
  }


  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          width: '100%',
          gap: 5,
          mb: 2,
        }}
      >
        <TextField
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography component="legend">Rating</Typography>
          <Rating
            value={rating}
            onChange={(_, newRating) => {
              setRating(newRating);
            }}
            size="large"
            max={4}
            slotProps={{
              icon: {
                component: DiamondIcon,
              }
            }}
          />
        </Box>
        <Button variant="outlined" onClick={handleClick}>
          ADD POKEMON
        </Button>
      </Box>
    </React.Fragment>
  );
}
