import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Typography, IconButton, Avatar, Divider } from "@mui/material";
import { CustomMenu, Link } from "../common";
import { SERVER_URL } from "../../constants";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function Layout({ title, description, children }: Props) {
  const menuOptions = [
    {
      label: "Index Page",
      path: "/",
    },
    {
      label: "Settings",
      path: "/settings",
    },
    {
      separator: true,
    },
    {
      label: "Logout",
      path: `${SERVER_URL}/auth/logout`,
      externalUrl: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <Grid
        container
        width="100vw"
        height="100vh"
        direction={{ xs: "column", md: "row" }}
      >
        <Grid
          container
          item
          width={{ xs: "100%", md: "16rem" }}
          direction={{ xs: "row", md: "column" }}
        >
          <Grid item flexGrow={1}>
            <Link to="/">
              <Typography
                fontSize="2rem"
                textAlign={{ xs: "left", md: "center" }}
              >
                FlowUp
              </Typography>
            </Link>
          </Grid>

          <Divider flexItem />

          <Grid item>
            <CustomMenu options={menuOptions}>
              <IconButton>
                <Avatar>D</Avatar>
              </IconButton>
            </CustomMenu>
          </Grid>
        </Grid>

        <Divider flexItem />
        <Divider flexItem orientation="vertical" />

        <Grid item px={2}>
          {children}
        </Grid>
      </Grid>
    </>
  );
}
