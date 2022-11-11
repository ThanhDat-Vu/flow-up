import { ReactNode, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  title: string;
  message: string;
  yesLabel?: string;
  noLabel?: string;
  onAccept?: () => void;
  children: ReactNode;
};

export default function AlertDialog({
  title,
  message,
  yesLabel = "yes",
  noLabel = "no",
  onAccept,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  const handleAnswerYes = () => {
    toggleOpen();
    onAccept && onAccept();
  };

  return (
    <>
      <Box component="span" onClick={toggleOpen}>
        {children}
      </Box>
      <Dialog
        open={open}
        onClose={toggleOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={toggleOpen}>
            {noLabel}
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAnswerYes}
            autoFocus
          >
            {yesLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
