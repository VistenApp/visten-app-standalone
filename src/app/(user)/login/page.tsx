'use client';

import * as React from 'react';
import { Alert, Button, TextField, FormControl } from '@mui/material';
import { login } from '../service';
import PageWrapper from '@/app/(components)/PageWrapper';

export default function Login() {
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/profile";
    }
  }, []);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  function handleLogin() {
    if (!username || !password) {
      setAlertMessage("Missing username or password");
      return;
    }
    login(username, password).then(() => {
      window.location.href = "/";
    }).catch((error: Error) => {
      setAlertMessage(error.message);
    });
  }

  return (
    <PageWrapper title="LOGIN">
      <FormControl sx={{ width: "21ch" }}>
        {alertMessage && (
          <Alert severity="error">{alertMessage}</Alert>
        )}
        <TextField
          required
          id="outlined-username-input"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button variant="outlined" onClick={handleLogin}>Login</Button>
        </div>
      </FormControl>
    </PageWrapper>
  )
}