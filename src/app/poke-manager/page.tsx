"use client";

import * as React from "react";
import {
  get_needed_pokemons,
  delete_needed_pokemon,
  get_extensions,
} from "./service";
import PageWrapper from "../(components)/PageWrapper";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Pokemon, Extension } from "./interface";
import PokemonForm from "./(components)/PokemonForm";
import CalculationForm from "./(components)/CalculationForm";

function renderRating(rating: number) {
  return (
    <Rating
      readOnly
      value={rating}
      max={4}
      slotProps={{
        icon: {
          component: DiamondIcon,
        },
      }}
    />
  );
}

function renderDelete(
  params: GridRenderCellParams,
  setAlertMessage: (message: string) => void,
  removePokemon: (id: number) => void
) {
  function handleClick(id: number) {
    delete_needed_pokemon(id)
      .then(() => {
        removePokemon(id);
      })
      .catch((error: Error) => {
        setAlertMessage(error.message);
      });
  }

  return (
    <Button onClick={() => handleClick(params.id as number)}>
      <DeleteForeverIcon />
    </Button>
  );
}

export default function PokeManager() {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [extension, setExtension] = React.useState("");
  const [extensions, setExtensions] = React.useState<Extension[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "NAME", minWidth: 150, flex: 1 },
    {
      field: "rarity",
      headerName: "RARITY",
      renderCell: (params) => renderRating(params.value),
      minWidth: 150,
      flex: 1,
    },
    { field: "pack_price", headerName: "PACK PRICE", minWidth: 200, flex: 1 },
    {
      field: "exchange_price",
      headerName: "EXCHANGE PRICE",
      minWidth: 250,
      flex: 1,
    },
    { field: "action", headerName: "ACTION", minWidth: 150 },
    {
      field: "delete",
      headerName: "DELETE",
      renderCell: (params) =>
        renderDelete(params, setAlertMessage, removePokemon),
      minWidth: 150,
    },
  ];

  React.useEffect(() => {
    get_extensions()
      .then((extensions) => {
        setExtensions(extensions);
      })
      .catch((error: Error) => {
        setAlertMessage(error.message);
      });
  }, []);

  const removePokemon = (id: number) => {
    setPokemons(pokemons.filter((pokemon) => pokemon.id !== id));
  };

  const handleSelection = (event: SelectChangeEvent) => {
    const extension = event.target.value as string;
    setExtension(extension);
    getPokemons(extension);
  };

  const getPokemons = (extension: string) => {
    get_needed_pokemons(extension as unknown as number)
      .then((pokemons) => {
        setPokemons(pokemons);
      })
      .catch((error: Error) => {
        setAlertMessage(error.message);
      });
  };

  return (
    <PageWrapper title="POKE MANAGER" alertMessage={alertMessage}>
      <FormControl fullWidth>
        <InputLabel id="extension-select-label">Extension</InputLabel>
        <Select
          labelId="extension-select-label"
          id="extension-select"
          value={extension}
          label="Extension"
          onChange={handleSelection}
          sx={{ width: "100%", mb: 2 }}
        >
          {extensions.map((extension: Extension) => (
            <MenuItem key={extension.id} value={extension.id}>
              {extension.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {extension && (
        <Box>
          <PokemonForm
            extension={parseInt(extension)}
            setAlertMessage={setAlertMessage}
            getPokemons={getPokemons}
          />
          <CalculationForm
            extension={parseInt(extension)}
            setAlertMessage={setAlertMessage}
            setPokemons={setPokemons}
          />
          <Paper>
            <DataGrid
              rows={pokemons}
              columns={columns}
              disableRowSelectionOnClick
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
            />
          </Paper>
        </Box>
      )}
    </PageWrapper>
  );
}
