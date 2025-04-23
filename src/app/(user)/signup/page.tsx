'use client';

import * as React from 'react';
import { Alert, Button, TextField, FormControl, Link } from '@mui/material';
import { signup } from '../service';
import PageWrapper from '@/app/(components)/PageWrapper';

export default function Login() {
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/profile";
    }
  }, []);

  const [username, setUsername] = React.useState("");
  const [usernameIsValid, setUsernameIsValid] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [passwordIsValid, setPasswordIsValid] = React.useState(true);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = React.useState(true);
  const [alertMessage, setAlertMessage] = React.useState("");

  function handleLogin() {
    let isValid = true;

    setUsernameIsValid(username != "");
    isValid = isValid ? username != "" : isValid;

    setPasswordIsValid(password != "");
    isValid = isValid ? password != "" : isValid;

    setConfirmPasswordIsValid(password == confirmPassword);
    isValid = isValid ? password == confirmPassword : isValid;

    if (isValid) {
      signup(username, password).then(() => {
        window.location.href = "/";
      }).catch((error: Error) => {
        setAlertMessage(error.message);
      });
    }
  }

  return (
    <PageWrapper title="SIGN UP">
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
          error={!usernameIsValid}
          helperText={!usernameIsValid ? "New password is required" : ""}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            error={!passwordIsValid}
            helperText={!passwordIsValid ? "Password is required" : ""}
        />
        <TextField
            required
            id="outlined-confirm-password-input"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!confirmPasswordIsValid}
            helperText={!confirmPasswordIsValid ? "Passwords do not match" : ""}
        />
        <div>
          <Button sx={{ mt: 1 }} variant="outlined" onClick={handleLogin}>Sign Up</Button>
        </div>
        <Link sx={{ mt: 1 }} href="/login">Log In</Link>
      </FormControl>
    </PageWrapper>
  )
}