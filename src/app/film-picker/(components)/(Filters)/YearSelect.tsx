import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

interface GenreProps {
    minYear: string;
    setMinYear: (minYear: string) => void;
    maxYear: string;
    setMaxYear: (maxYear: string) => void;
}

export default function YearSelect({ minYear, setMinYear, maxYear, setMaxYear }: GenreProps) {

    const handleMinYear = (event: SelectChangeEvent) => {
        const minYear = event.target.value as string;
        setMinYear(minYear);
    };

    const handleMaxYear = (event: SelectChangeEvent) => {
        const maxYear = event.target.value as string;
        setMaxYear(maxYear);
    };
    return (
        <div>
            <Typography component="legend">Release Year</Typography>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
                gap: 1,
            }}>
                <FormControl fullWidth>
                    <InputLabel id="min-year-select-label">Min</InputLabel>
                    <Select
                        labelId="min-year-select-label"
                        id="min-year-select"
                        value={minYear}
                        label="Min"
                        onChange={handleMinYear}
                        sx={{ width: "100%", mb: 2 }}
                        MenuProps={MenuProps}
                    >
                        {getYearChoices(1900, maxYear ? maxYear as unknown as number : new Date().getFullYear())}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="max-year-select-label">Max</InputLabel>
                    <Select
                        labelId="max-year-select-label"
                        id="max-year-select"
                        value={maxYear}
                        label="max"
                        onChange={handleMaxYear}
                        sx={{ width: "100%", mb: 2 }}
                        MenuProps={MenuProps}
                    >
                        {getYearChoices(minYear ? minYear as unknown as number : 1900, new Date().getFullYear())}
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

function getYearChoices(minYear: number, MaxYear: number) {
    const choices = [
        <MenuItem key="" value="">
            &nbsp;
        </MenuItem>
    ];
    for (let i = MaxYear; i >= minYear; i--) {
        choices.push(
            <MenuItem key={i} value={i}>
                {i}
            </MenuItem>
        );
    }
    return choices;
}
