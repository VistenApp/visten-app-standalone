'use client';

import * as React from 'react';
import { get_needed_pokemons } from './service';
import PageWrapper from '../(components)/PageWrapper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Rating } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

const columns: GridColDef[] = [
  // { field: 'extension', headerName: 'EXTENSION', flex: 1 },
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'NAME', flex: 1},
  { field: 'rarity', headerName: 'RARITY', renderCell: renderRating, flex: 1},
  { field: 'pack_price', headerName: 'PACK PRICE', flex: 1},
  { field: 'exchange_price', headerName: 'EXCHANGE PRICE', flex: 1},
];

function renderRating(params: any) {
  return <Rating
    readOnly
    value={params.value}
    max={4} 
    slotProps={{
      icon: {
        component: DiamondIcon,
      }
    }}/>;
}

export default function PokeManager() {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [pokemons, setPokemons] = React.useState([]);
  React.useEffect(() => {
    get_needed_pokemons().then((pokemons) => {
      setPokemons(pokemons);
    }).catch((error: any) => {
      setAlertMessage(error.message);
    });
  }, []);
  return (
    <PageWrapper title="POKE MANAGER" alertMessage={alertMessage}>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={pokemons}
          columns={columns}
          checkboxSelection
          sx={{ border: 0 }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      </Paper>
    </PageWrapper>
  )
}