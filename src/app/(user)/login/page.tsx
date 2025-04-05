'use client';

import * as React from 'react';
import { Box, Typography, Button, TextField, FormControl } from '@mui/material';

export default function Login() {

    function handleLogin() {
        console.log("Login button clicked");
    }

    return (
        <Box sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, "textAlign":"center" }}>
        <FormControl>
            <Typography variant="h4">
                Login
            </Typography>
            <div>
                <TextField
                required
                id="outlined-username-input"
                label="Username"
                />
            </div>
            <div>
                <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                />
            </div>
            <div>
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
            </div>
        </FormControl>
        </Box>
    )
}