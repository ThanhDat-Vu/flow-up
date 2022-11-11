import { ReactElement, useState } from "react";
import { Snackbar } from "@mui/material";

type Props = {
  vertical: "top" | "bottom";
  horizontal: "left" | "right";
  duration: number;
  message?: string;
  render?: () => ReactElement | undefined;
};

let openNotifier: (props: Props) => void;

export function notify(props: Props) {
  openNotifier(props);
}

export default function Notifier() {
  const [state, setState] = useState<Props>({
    vertical: "bottom",
    horizontal: "left",
    duration: 1000,
    message: "",
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openSnackbar = (props: Props) => {
    setState(props);
    handleOpen();
  };

  openNotifier = openSnackbar;

  return (
    <Snackbar
      anchorOrigin={{ vertical: state.vertical, horizontal: state.horizontal }}
      autoHideDuration={state.duration}
      open={open}
      onClose={handleClose}
      message={state.message}
    >
      {state.render && state.render()}
    </Snackbar>
  );
}
