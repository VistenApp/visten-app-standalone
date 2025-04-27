import { Box, Grid, Stack, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import * as React from "react";
import { Member } from "../interface";

interface FilmInfosProps {
    film: any;
}

export default function FilmInfos({ film }: FilmInfosProps) {
    const [directors, setDirectors] = React.useState<String[]>([]);
    const [writers, setWriters] = React.useState<String[]>([]);
    React.useEffect(() => {
        if (!film) return

        const directors = film.credits.crew
            .filter((member: Member) => member.job === "Director")
            .map((member: Member) => member.name);
        setDirectors(directors);

        const writers = film.credits.crew
            .filter((member: Member) => member.job === "Screenplay" || member.job === "Writer")
            .map((member: Member) => member.name);
        setWriters(writers);
    }, [film])
    return (<>
        {film && (<>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 2 }}
                sx={{
                    margin: 2,
                }}>
                <div>
                    <img
                        src={film.poster_path}
                        alt="Poster of the Film"
                        loading="lazy"
                        style={{ width: "300px", height: "450px", borderRadius: "25px" }}
                    />
                </div>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ textAlign: "left" }}>
                        <Typography variant="h5">
                            {film.title}
                        </Typography>
                        <Box>
                            <span>{formatDate(film.release_date)}</span>
                            {" • "}
                            <span>{formatRuntime(film.runtime)}</span>
                        </Box>
                        <Box sx={{ alignItems: "center", display: "inline-flex" }}>
                            <StarIcon sx={{ color: "#faaf00" }} />
                            <Typography>{film.vote_average.toFixed(1)}/10</Typography>
                            <Typography variant="caption">&nbsp;based on {film.vote_count} votes</Typography>
                        </Box>
                    </Box>
                    <Stack direction="column" spacing={1} sx={{ textAlign: "left" }}>
                        <p>
                            <span style={{ fontWeight: "bold" }}>Director{directors.length > 1 && "s"}</span>
                            &emsp; {directors.join(", ")}
                        </p>
                        <p>
                            <span style={{ fontWeight: "bold" }}>Writer{writers.length > 1 && "s"}</span>
                            &emsp;{writers.join(", ")}
                        </p>
                        <p>
                            <span style={{ fontWeight: "bold" }}>Cast</span>
                            &emsp;
                            {film.credits.cast
                                .slice(0, 4)
                                .map((member: any) => member.name)
                                .join(", ")}
                        </p>
                        <div>
                            <Typography variant="subtitle1">Overview</Typography>
                            <Typography sx={{
                                textAlign: "justify",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                WebkitLineClamp: 8,
                            }} >{film.overview}</Typography>
                        </div>
                        <Grid container spacing={1}>
                            {film.genres.map((genre: { id: number, name: string }) =>
                                <Grid key={genre.id}>
                                    <span style={{
                                        padding: 5,
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        borderRadius: 25,
                                        whiteSpace: "nowrap",
                                        fontSize: "0.8em",
                                    }}>
                                        {genre.name}
                                    </span>
                                </Grid>
                            )}
                        </Grid>
                    </Stack>
                </Box>
            </Stack>
        </>)}
    </>);
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.getFullYear();
}

function formatRuntime(runtime: number) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    let formattedRuntime = hours + "h ";
    if (minutes < 10) {
        formattedRuntime += "0";
    }
    formattedRuntime += minutes;
    return formattedRuntime;
}