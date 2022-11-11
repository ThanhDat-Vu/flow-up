import { Button } from "@mui/material";
import AlertDialog from "../components/common/AlertDialog";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout
      title="FlowUp | Home"
      description="Flow Up is a project management app."
    >
      <h1>Home</h1>
      <AlertDialog title="Will you marry me?" message="I'm rich :>">
        <Button variant="contained">Click me</Button>
      </AlertDialog>
    </Layout>
  );
}
