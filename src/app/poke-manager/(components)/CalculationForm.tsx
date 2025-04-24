import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Stack, useMediaQuery } from '@mui/material';
import { calculate } from '../service';
import { Pokemon } from '../interface';
import theme from '@/app/theme';

interface FormDialogProps {
  extension: number;
  setAlertMessage: (message: string) => void;
  setPokemons: (pokemons: Pokemon[]) => void;
}

export default function PokemonForm({ extension, setAlertMessage, setPokemons }: FormDialogProps) {
  const [packPoints, setPackPoints] = React.useState<string>("");
  const [totalExchangeCost, setTotalExchangeCost] = React.useState<string>("0");
  const [totalPackCost, setTotalPackCost] = React.useState<string>("0");
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 2, sm: 5 }}
      sx={{
        alignItems: 'center',
        mb: 2,
      }}
    >
      <TextField
        id="packPoints"
        label="Pack Points"
        type="number"
        value={packPoints}
        onChange={(e) => setPackPoints(e.target.value)}
        sx={isMobile ? {} : { width: '11em' }}
      />
      <TextField
        id="packCost"
        label="Pack Cost"
        disabled
        value={totalPackCost}
        sx={isMobile ? {} : { width: '11em' }}
      />
      <TextField
        id="exchangeCost"
        label="Exchange Cost"
        disabled
        value={totalExchangeCost}
        sx={isMobile ? {} : { width: '11em' }}
      />
      <Button variant="outlined" onClick={handleClick}>
        CALCULATE
      </Button>
    </Stack>
  );
}
