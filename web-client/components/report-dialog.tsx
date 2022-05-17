import React, { useState } from "react";
import { Flag } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation } from "react-query";
import { api } from "../api";

export interface ReportDialogProps {
  postId: number;
}

export const ReportDialog: React.FC<ReportDialogProps> = ({ postId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const { mutate, isLoading } = useMutation(
    () => api.post("reports", { json: { postId, reason: value } }).json(),
    {
      onSuccess: () => {
        alert("Zgłoszono ogłoszenie.");
        setValue("");
        setIsOpen(false);
      },
      onError: () => {
        alert("Coś poszło nie tak.");
      },
    }
  );

  const close = () => setIsOpen(false);

  const report = () => {
    mutate();
  };

  return (
    <>
      <Button
        startIcon={<Flag />}
        color="error"
        onClick={() => setIsOpen(true)}
      >
        Zgłoś
      </Button>
      <Dialog fullWidth maxWidth="md" open={isOpen} onClose={close}>
        <DialogTitle>Zgłoś ogłoszenie</DialogTitle>
        <DialogContent>
          <TextField
            label="Przyczyna zgłoszenia"
            multiline
            minRows={3}
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Zamknij</Button>
          <Button
            disabled={isLoading || !value.trim().length}
            onClick={report}
            autoFocus
          >
            Zgłoś
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
