import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { calculate } from '../service';
import { Pokemon } from '../interface';

interface FormDialogProps {
  extension: number;
  setAlertMessage: (message: string) => void;
  setPokemons: (pokemons: Pokemon[]) => void;
}

export default function PokemonForm({ extension, setAlertMessage, setPokemons }: FormDialogProps) {
  const [packPoints, setPackPoints] = React.useState<string>("");
const [totalExchangeCost, setTotalExchangeCost] = React.useState<string>("0");
const [totalPackCost, setTotalPackCost] = React.useState<string>("0");

  function handleClick() {
    if (packPoints === "") {
      setAlertMessage("PackPoints is required");
      return;
    }
    calculate(extension, parseInt(packPoints)).then((pokemons) => {
        const exchanging_pokemons = pokemons["exchange"]
        let totalExchangeCost = 0
        for (let i = 0; i < exchanging_pokemons.length; i++) {
          exchanging_pokemons[i]["action"] = "EXCHANGE"
          totalExchangeCost += exchanging_pokemons[i]["exchange_price"]
        }
        setTotalExchangeCost(totalExchangeCost.toString())

        const buying_pokemons = pokemons["buy"]
        let totalPackCost = 0
        for (let i = 0; i < buying_pokemons.length; i++) {
          buying_pokemons[i]["action"] = "BUY"
          totalPackCost += buying_pokemons[i]["pack_price"]
        }
        setTotalPackCost(totalPackCost.toString())

        setPokemons(exchanging_pokemons.concat(buying_pokemons));
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
          mb: 2,
          gap: 5,
        }}
      >
        <TextField
          id="packPoints"
          label="Pack Points"
          type="number"
          value={packPoints}
          onChange={(e) => setPackPoints(e.target.value)}
          sx={{ width: '15%' }}
        />
        <TextField
          id="packCost"
          label="Pack Cost"
          disabled
          value={totalPackCost}
          sx={{ width: '15%' }}
        />
        <TextField
          id="exchangeCost"
          label="Exchange Cost"
          disabled
          value={totalExchangeCost}
          sx={{ width: '15%' }}
        />
        <Button variant="outlined" onClick={handleClick}>
          CALCULATE
        </Button>
      </Box>
    </React.Fragment>
  );
}
