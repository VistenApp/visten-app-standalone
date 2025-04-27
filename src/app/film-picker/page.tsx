'use client';
import React from "react";
import { Button } from '@mui/material';
import PageWrapper from "../(components)/PageWrapper";
import { get_random_film } from "./service";
import { Member } from "./interface";
import FilmInfos from "./(components)/FilmInfos";
import Filters from "./(components)/Filters";

export default function FilmPicker() {
    const [alertMessage, setAlertMessage] = React.useState("");
    const [film, setFilm] = React.useState<any>(null);
    const [directors, setDirectors] = React.useState<String[]>([]);
    const [writers, setWriters] = React.useState<String[]>([]);
    const [filters, setFilters] = React.useState<string>("");

    function get_film() {
        setAlertMessage("");
        get_random_film(filters).then((data) => {
            setFilm(data);

            const directors = data.credits.crew
                .filter((member: any) => member.job === "Director")
                .map((member: any) => member.name);
            setDirectors(directors);

            const writers = data.credits.crew
                .filter((member: Member) => member.job === "Screenplay" || member.job === "Writer")
                .map((member: Member) => member.name);
            setWriters(writers);
        }).catch((error) => {
            setAlertMessage(error.message);
        });
    }

    return (
        <PageWrapper title="FILM PICKER" alertMessage={alertMessage}>
            <FilmInfos film={film} directors={directors} writers={writers} />
            <Button variant="outlined" onClick={get_film}>Pick</Button>
            <Filters setFilters={setFilters}></Filters>
        </PageWrapper>
    )
}