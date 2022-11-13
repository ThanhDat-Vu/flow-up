import { SERVER_URL } from "../constants";
import { Helmet } from "react-helmet-async";
import { Box, Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link } from "../components/common";

export default function Login() {
  const GoogleAuthUrl = `${SERVER_URL}/auth/google`;

  return (
    <>
      <Helmet>
        <title>Flow Up | Login</title>
      </Helmet>
      <Box sx={{ textAlign: "center" }}>
        <h1>Login</h1>
        <p>You'll be logged in for 14 days unless you log out manually.</p>
        <Button variant="contained" startIcon={<Google />} href={GoogleAuthUrl}>
          Log in with Google
        </Button>
        <p>
          Or, <Link to="/">back to homepage</Link>.
        </p>
      </Box>
    </>
  );
}
