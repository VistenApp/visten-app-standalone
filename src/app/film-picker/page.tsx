'use client';
import React from "react";
import { Button } from '@mui/material';
import PageWrapper from "../(components)/PageWrapper";
import { get_random_film } from "./service";
import FilmInfos from "./(components)/FilmInfos";
import Filters from "./(components)/(Filters)/Filters";
import { Film } from "./interface";

export default function FilmPicker() {
    const [alertMessage, setAlertMessage] = React.useState("");
    const [film, setFilm] = React.useState<Film | null>(null);
    const [filters, setFilters] = React.useState<string>("");

    React.useEffect(() => {
        get_film();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function get_film() {
        setAlertMessage("");
        get_random_film(filters).then((data) => {
            setFilm(data);
        }).catch((error) => {
            setAlertMessage(error.message);
        });
    }

    return (
        <PageWrapper title="FILM PICKER" alertMessage={alertMessage}>
            {film && <>
                <FilmInfos film={film} />
                <Button variant="outlined" onClick={get_film}>Pick</Button>
                <Filters setFilters={setFilters}></Filters>
            </>}
        </PageWrapper>
    )
}