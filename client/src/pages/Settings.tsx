import Layout from "../components/layout";
import { Stack, Typography, Avatar, Button, TextField } from "@mui/material";
import { useState, SyntheticEvent, useEffect } from "react";
import { getUserBySlug, updateProfile } from "../api";
import nProgress from "nprogress";

export default function Settings() {
  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    avatarUrl: "",
  });

  useEffect(() => {
    getUserBySlug("admin").then((user) => setProfile(user));
  }, []);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    nProgress.start();
    try {
      updateProfile(profile).then((user) => setProfile(user));
    } catch (err) {
      console.log(err);
    } finally {
      nProgress.done();
    }
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
            helperText="Your display name as seen by your team members."
            variant="standard"
            value={profile.displayName}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                displayName: e.target.value,
              }))
            }
          />
          <TextField
            id="email"
            label="Email"
            helperText="This email associates with your account."
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
            value={profile.email}
            onChange={(e) =>
              setProfile((prevProfile) => ({
                ...prevProfile,
                email: e.target.value,
              }))
            }
          />
          <Button type="submit" variant="contained">
            Save changes
          </Button>
        </Stack>
      </form>
    </Layout>
  );
}
