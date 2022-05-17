import { useUser } from "@auth0/nextjs-auth0";
import { Stack, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import React, { useMemo } from "react";

export interface CommentProps {
  id: number;
  authorNickname: string;
  creationDate: string;
  body: string;
}

export const Comment: React.FC<CommentProps> = ({
  id,
  authorNickname,
  creationDate,
  body,
}) => {
  const timeAgo = useMemo(
    () =>
      formatDistanceToNow(new Date(creationDate), {
        includeSeconds: false,
        addSuffix: true,
        locale: pl,
      }),
    [creationDate]
  );

  return (
    <Stack spacing={0.5}>
      <Stack spacing={1} direction="row">
        <Typography variant="body2">
          <b>{authorNickname}</b>
        </Typography>

        <Typography color="secondary" variant="body2">
          {timeAgo}
        </Typography>
      </Stack>
      <div>
        <Typography variant="body2">{body}</Typography>
      </div>
    </Stack>
  );
};
