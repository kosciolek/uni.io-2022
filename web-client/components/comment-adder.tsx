import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Button,
  Collapse,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../api";

export interface CommentAdderProps {
  postId: number;
}

export const CommentAdder: React.FC<CommentAdderProps> = ({ postId }) => {
  const { user } = useUser();

  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => api.post("comments", { json: { postId, body: value } }).json(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        setValue("");
      },
    }
  );

  const onAdd = () => !mutation.isLoading && mutation.mutate();

  if (!user)
    return (
      <Typography variant="body2">
        Musisz być zalogowany, by dodawać komentarze.
      </Typography>
    );

  return (
    <Stack spacing={2}>
      <TextField
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        label="Dodaj komentarz"
        multiline
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={mutation.isLoading}
      />
      <Collapse in={focused || Boolean(value.trim().length)}>
        <Box display="flex" justifyContent="end">
          <Button
            onClick={onAdd}
            disabled={mutation.isLoading || !Boolean(value.trim().length)}
          >
            Dodaj
          </Button>
        </Box>
      </Collapse>
    </Stack>
  );
};
