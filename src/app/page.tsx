"use client";

import React from "react";
import Typographie from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
// import TimeTable from "./(components)/TimeTable";
import HackerNews from "./hacker-news/page";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  React.useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <>
      {/* <TimeTable></TimeTable> */}
      <Box sx={{ textAlign: "center", width: "100%", mb: 3, mt: 3 }}>
        <Typographie variant="h3">
          WELCOME TO VISTEN{" "}
          <span style={{ whiteSpace: "nowrap" }}>(ㆆ _ ㆆ)</span>
        </Typographie>
        <Typographie variant="h5" sx={{ mt: 3 }}>
          This is an app where I put random functionalities...
        </Typographie>
        {!isLoggedIn && (
          <div>
            <Box
              sx={{
                mt: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button variant="outlined" href="/login">
                Log In
              </Button>
              <Link href="/signup">Sign up</Link>
            </Box>
          </div>
        )}
      </Box>
      <HackerNews />
    </>
  );
}
