import { useLoaderData } from "react-router-dom";
import { useState, SyntheticEvent, ChangeEvent, useEffect } from "react";
import waitforit from "../utils/waitforit";
import { getPresignedUrlToUpload, updateProfile } from "../api";
import Layout from "../components/layout";
import { Stack, Typography, Avatar, Button, TextField } from "@mui/material";

interface IUser {
  displayName: "";
  email: "";
  avatarUrl: "";
}

function Settings() {
  const user: IUser | any = useLoaderData();

  const [profile, setProfile] = useState(user);

  const [avatar, setAvatar] = useState<any>();
  useEffect(() => {
    if (!avatar) {
      setProfile((prevProfile: IUser) => ({
        ...prevProfile,
        avatarUrl: undefined,
      }));
      return;
    }
    const avatarUrl = URL.createObjectURL(avatar);
    setProfile((prevProfile: IUser) => ({ ...prevProfile, avatarUrl }));
    return () => URL.revokeObjectURL(avatarUrl);
  }, [avatar?.name]);

  function previewAvatar(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setAvatar(file);
    }
  }

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    waitforit(async () => {
      const presignedUrl = await getPresignedUrlToUpload();
      console.log(presignedUrl);
      // setProfile((prevProfile: IUser) => ({
      //   ...prevProfile,
      //   avatarUrl: presignedUrl,
      // }));
      // updateProfile(profile).then((user) => setProfile(user));
    });
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
              Upload
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => previewAvatar(e)}
              />
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
              setProfile((prevProfile: IUser) => ({
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
              setProfile((prevProfile: IUser) => ({
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

export default Settings;
