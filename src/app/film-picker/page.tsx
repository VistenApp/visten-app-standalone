'use client';
import React from "react";
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import PageWrapper from "../(components)/PageWrapper";
import { get_random_film } from "./service";
import { Member } from "./interface";

export default function FilmPicker() {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [film, setFilm] = React.useState<any>(null);
  const [directors, SetDirectors] = React.useState<String[]>([]);
  const [writers, SetWriters] = React.useState<String[]>([]);

  function get_film() {
    setAlertMessage("");
    get_random_film().then((data) => {
        setFilm(data);

        const directors = data.credits.crew
            .filter((member: any) => member.job === "Director")
            .map((member: any) => member.name);
        SetDirectors(directors);

        const writers = data.credits.crew
            .filter((member: Member) => member.job === "Screenplay" ||  member.job === "Writer")
            .map((member: Member) => member.name);
        SetWriters(writers);
    }).catch((error) => {
        setAlertMessage(error.message);
    });
  }

  return (
    <PageWrapper title="FILM PICKER" alertMessage={alertMessage}>
        {film && (
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
                        style={{ width: "300px", borderRadius: "25px" }}
                    />
                </div>
                <Box sx={{display: "flex", flexDirection: "column" }}>
                    <Box sx={{textAlign: "left"}}>                        
                        <Typography variant="h5">
                            {film.title}
                        </Typography>
                        <Box>                            
                            <span>{formatDate(film.release_date)}</span>
                            {" • "}
                            <span>{formatRuntime(film.runtime)}</span>
                        </Box>
                    </Box>
                    <Stack direction="column" spacing={1} sx={{ mt:3, textAlign: "left" }}>
                        <Box sx={{alignItems: "center", display: "inline-flex"}}>
                            <StarIcon sx={{color: "#faaf00"}}/>
                            <Typography>{film.vote_average.toFixed(1)}/10</Typography>
                            <Typography variant="caption">&nbsp; based on {film.vote_count} votes</Typography>
                        </Box>
                        <Stack 
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 3 }}
                        >
                            { directors &&
                                <div>
                                    <Typography variant="subtitle1">Director{directors.length > 1 && "s"}</Typography>
                                    <p  style={{ fontSize: "0.9em" }}>
                                    &emsp;
                                    {directors.join(", ")}
                                    </p>
                                </div>
                            }
                            { writers &&
                                <div>
                                    <Typography variant="subtitle1">Writer{writers.length > 1 && "s"}</Typography>
                                    <p  style={{ fontSize: "0.9em" }}>
                                    &emsp;
                                    {writers.join(", ")}
                                    </p>
                                </div>
                            }
                        </Stack>
                            <div>
                                <Typography variant="subtitle1">Actors</Typography>
                                <p  style={{ fontSize: "0.9em" }}>
                                &emsp;
                                {film.credits.cast
                                    .slice(0, 4)
                                    .map((member: any) => member.name)
                                    .join(", ")}
                                </p>                                
                            </div>
                        <div style={{marginBottom: "20px"}}>
                            <Typography variant="subtitle1">Overview</Typography>
                            <Typography sx={{ 
                                textAlign: "justify", 
                                fontSize: "0.9em",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                WebkitLineClamp: 4, 
                            }} >{film.overview}</Typography>
                            <Grid container spacing={2} sx={{mt:2}}>
                                {film.genres.map((genre: { id: number, name: string }) => 
                                    <Grid key={ genre.id }>
                                        <span style={{
                                            padding: 5,
                                            borderWidth: "1px",
                                            borderStyle: "solid",
                                            borderRadius: 25,
                                            whiteSpace: "nowrap",
                                        }}>
                                            { genre.name }
                                        </span>
                                    </Grid>
                                )}
                            </Grid>
                        </div>
                    </Stack>
                </Box>
            </Stack>
        )}
        <Button variant="outlined" onClick={get_film}>Pick</Button>
    </PageWrapper>
  )
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