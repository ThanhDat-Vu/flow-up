import Layout from "../components/layout";
import { Stack, Typography, Avatar, Button, TextField } from "@mui/material";
import { useState, SyntheticEvent } from "react";

export default function Settings() {
  const [profile, setProfile] = useState({
    displayName: "",
    avatarUrl: "",
  });

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <Layout title="FlowUp | Settings" description="FlowUp settings page">
      <h1>Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <Stack alignItems="flex-start" spacing={2}>
          <Typography variant="h6">Profile Picture</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={profile.displayName}
              src={profile.avatarUrl}
              sx={{ width: 64, height: 64 }}
            >
              {profile.displayName[0]}
            </Avatar>
            <Button size="small" variant="outlined" component="label">
              {" "}
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Stack>

          <Typography variant="h6">Public Profile</Typography>
          <TextField
            id="displayName"
            label="Display Name"
            value={profile.displayName}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                displayName: e.target.value,
              }))
            }
            helperText="Your display name as seen by your team members."
            variant="standard"
          />
          <TextField
            id="email"
            label="Email"
            helperText="This email associates with your account."
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
          <Button type="submit" variant="contained">
            Save changes
          </Button>
        </Stack>
      </form>
    </Layout>
  );
}
