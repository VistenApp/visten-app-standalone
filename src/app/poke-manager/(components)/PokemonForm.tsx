import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Rating, Stack, Typography } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import { add_needed_pokemon } from "../service";

interface FormDialogProps {
  extension: number;
  setAlertMessage: (message: string) => void;
  getPokemons: (extension: string) => void;
}

export default function PokemonForm({
  extension,
  setAlertMessage,
  getPokemons,
}: FormDialogProps) {
  const [rarity, setRarity] = React.useState<number | null>(0);
  const [name, setName] = React.useState<string>("");

  function handleClick() {
    if (name === "") {
      setAlertMessage("Name is required");
      return;
    }
    if (rarity === null || rarity === 0) {
      setAlertMessage("Rarity is required");
      return;
    }

    add_needed_pokemon(extension, name, rarity)
      .then(() => {
        getPokemons(extension.toString());
      })
      .catch((error: Error) => {
        setAlertMessage(error.message);
      });
  }

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 5 }}
      sx={{
        alignItems: "center",
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
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography component="legend">Rarity</Typography>
        <Rating
          value={rarity}
          onChange={(_, newRarity) => {
            setRarity(newRarity);
          }}
          sx={{ scale: 1.4 }}
          max={4}
          slotProps={{
            icon: {
              component: DiamondIcon,
            },
          }}
        />
      </Box>
      <Button variant="outlined" onClick={handleClick}>
        ADD POKEMON
      </Button>
    </Stack>
  );
}
