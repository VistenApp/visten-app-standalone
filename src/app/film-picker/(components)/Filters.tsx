import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import GenreSelect from './GenreSelect';
import { Box, Rating, Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
}));

interface FiltersProps {
    setFilters: (filters: string) => void;
}

export default function Filters({ setFilters }: FiltersProps) {
    const [open, setOpen] = React.useState(false);
    const [genres, setGenres] = React.useState<number[]>([]);
    const [rating, setRating] = React.useState<number | null>(0);

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
        setFilters(filters);
        setOpen(false);
    };
    return (
        <>
            <IconButton onClick={handleClickOpen} sx={{ ml: 1, position: 'absolute' }} >
                <FilterListIcon />
            </IconButton>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
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
                    <GenreSelect
                        selectedGenres={genres}
                        setSelectedGenres={setGenres}
                    ></GenreSelect>
                    <Box m={1}>
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
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}
