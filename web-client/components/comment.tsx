import { Stack, Typography } from "@mui/material";
import React from "react";

export interface CommentProps {
  id: number;
  author: string;
  date: number;
  body: string;
}

export const Comment: React.FC<CommentProps> = ({ id, author, date, body }) => {
  return (
    <Stack spacing={0.5}>
      <Stack spacing={1} direction="row">
        <Typography variant="body2">
          <b>{author}</b>
        </Typography>
        <Typography variant="body2">
          {new Date(date).toLocaleString()}
        </Typography>
      </Stack>
      <div>
        <Typography variant="body2">{body}</Typography>
      </div>
    </Stack>
  );
};
