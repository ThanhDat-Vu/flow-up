import Layout from "../components/layout";
import { Alert, Button } from "@mui/material";
import { AlertDialog } from "../components/common";
import { notify } from "../components/common/Notifier";
import NProgress from "nprogress";

export default function Home() {
  return (
    <Layout
      title="FlowUp | Home"
      description="Flow Up is a project management app."
    >
      <h1>Home</h1>
      <AlertDialog
        title="Will you marry me?"
        message="I'm rich :>"
        onAccept={() => {
          NProgress.start();
          try {
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
          } catch (err) {
            console.log(err);
          } finally {
            NProgress.done();
          }
        }}
      >
        <Button variant="contained">Click me</Button>
      </AlertDialog>
    </Layout>
  );
}
