'use client';

import * as React from 'react';
import { Alert, Button, TextField, FormControl } from '@mui/material';
import { get_profile, change_password } from '../service';
import PageWrapper from '@/app/(components)/PageWrapper';

export default function Profile() {
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    } else {
        get_profile().then((data) => {
          setUsername(data.username);
        }).catch((error) => {
          setAlertMessage(error.message);
          setAlertSeverity("error");
        });
    }
  }, []);

  const [username, setUsername] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState<"error" | "info" | "success" | "warning">("info");


  return (
    <PageWrapper title="PROFILE">
      <FormControl sx={{ width: "21ch" }}>
        {alertMessage && (
          <Alert severity={alertSeverity} sx={{mb: 1}}>{alertMessage}</Alert>
        )}
        <TextField
          disabled
          id="outlined-username-input"
          label="Username"
          value={username}
        />
        <PasswordChangeForm />
      </FormControl>
    </PageWrapper>
  )
}

function PasswordChangeForm() {
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState<"error" | "info" | "success" | "warning">("info");
  const [changingPassword, setChangingPassword] = React.useState(false);

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [currentPasswordIsValid, setCurrentPasswordIsValid] = React.useState(true);

  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordIsValid, setNewPasswordIsValid] = React.useState(true);

  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [confirmNewPasswordIsValid, setConfirmNewPasswordIsValid] = React.useState(true);

  function changePassword() {
    setChangingPassword(true);
    setAlertMessage("");
  }

  function saveNewPassword() {
    let isValid = true;

    setCurrentPasswordIsValid(currentPassword != "");
    isValid = isValid ? currentPassword != "" : isValid;

    setNewPasswordIsValid(newPassword != "");
    isValid = isValid ? newPassword != "" : isValid;

    setConfirmNewPasswordIsValid(newPassword == confirmNewPassword);
    isValid = isValid ? newPassword == confirmNewPassword : isValid;

    if (isValid) {
      change_password(currentPassword, newPassword).then(() => {
        setAlertMessage("Password changed successfully.");
        setAlertSeverity("success");
        setChangingPassword(false);
      }).catch((error) => {
        setAlertMessage(error.message);
        setAlertSeverity("error");
      });
    }
  }

  let passwordForm;
  if (changingPassword) {
    passwordForm = (
      <div>
        <div>
          <TextField
              required
              id="outlined-current-password-input"
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={!currentPasswordIsValid}
              helperText={!currentPasswordIsValid ? "Current password is required" : ""}
          />
        </div>
        <div>
          <TextField
              required
              id="outlined-new-password-input"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!newPasswordIsValid}
              helperText={!newPasswordIsValid ? "New password is required" : ""}
          />
        </div>
        <div>
          <TextField
              required
              id="outlined-confirm-new-password-input"
              label="Confirm New Password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              error={!confirmNewPasswordIsValid}
              helperText={!confirmNewPasswordIsValid ? "Passwords do not match" : ""}
          />
        </div>
        <div>
            <Button variant="outlined" onClick={saveNewPassword}>Save</Button>
        </div>
      </div>
    );
  } else {
      passwordForm = (
          <div>
              <Button variant="outlined" onClick={changePassword}>Change Password</Button>
          </div>
      );
  }

  return (
    <div>
      {alertMessage && (
        <Alert severity={alertSeverity} sx={{mb: 1}}>{alertMessage}</Alert>
      )}
      {passwordForm}
    </div>
  )
}
