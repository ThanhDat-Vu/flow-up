import Layout from "../components/layout";
import { Box, Alert, Button } from "@mui/material";
import { AlertDialog, Link } from "../components/common";
import waitforit from "../utils/waitforit";
import { notify } from "../components/common/Notifier";

export default function Home() {
  return (
    <Layout
      title="FlowUp | Home"
      description="Flow Up is a project management app."
    >
      <h1>Home</h1>
      <Box mb={2}>
        <Link to="/settings">Settings page</Link>
      </Box>
      <AlertDialog
        title="Will you marry me?"
        message="I'm rich :>"
        onAccept={() => {
          waitforit(() => {
            notify({
              vertical: "top",
              horizontal: "right",
              duration: 2000,
              render: () => (
                <Alert severity="success">
                  You have successfully confirmed!
                </Alert>
              ),
            });
          });
        }}
      >
        <Button variant="contained">Click me</Button>
      </AlertDialog>
    </Layout>
  );
}
