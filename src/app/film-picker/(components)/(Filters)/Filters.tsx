import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import GenreSelect from './GenreSelect';
import YearSelect from './YearSelect';
import { Box, Rating, Stack, Typography } from '@mui/material';

interface FiltersProps {
    setFilters: (filters: string) => void;
}

export default function Filters({ setFilters }: FiltersProps) {
    const [open, setOpen] = React.useState(false);
    const [genres, setGenres] = React.useState<number[]>([]);
    const [rating, setRating] = React.useState<number | null>(0);
    const [minYear, setMinYear] = React.useState<string>("");
    const [maxYear, setMaxYear] = React.useState<string>("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        let filters = "?";
        if (genres.length) {
            filters = filters + "with_genres=" + genres.join(",") + "&";
        }
        if (rating) {
            filters = filters + "vote_average=" + rating + "&";
        }
        if (minYear) {
            filters = filters + "release_year_min=" + minYear + "&";
        }
        if (maxYear) {
            filters = filters + "release_year_max=" + maxYear + "&";
        }
        setFilters(filters);
        setOpen(false);
    };


    return (
        <>
            <IconButton onClick={handleClickOpen} sx={{ ml: 1, position: 'absolute' }} >
                <FilterListIcon />
            </IconButton>
            <Dialog
                onClose={handleClose}
                open={open}
                sx={{ m: 0 }}
            >
                <DialogTitle>
                    Filters
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Stack spacing={1}>
                        <GenreSelect
                            selectedGenres={genres}
                            setSelectedGenres={setGenres}
                        ></GenreSelect>
                        <Box>
                            <Typography component="legend">Minimum Rating</Typography>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    precision={0.5}
                                    onChange={(_, newRating) => setRating(newRating)}
                                    max={10}
                                />
                            </Box>
                        </Box>
                        <YearSelect
                            minYear={minYear} setMinYear={setMinYear}
                            maxYear={maxYear} setMaxYear={setMaxYear}
                        >
                        </YearSelect>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}