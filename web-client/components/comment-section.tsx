import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { CommentProps, Comment } from "./comment";
import { CommentAdder } from "./comment-adder";

export interface CommentSectionProps {
  postId: number;
  comments: CommentProps[];
}

const COMMENTS_PER_PAGE = 8;

export const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
}) => {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(comments.length / COMMENTS_PER_PAGE);

  const startIndex = COMMENTS_PER_PAGE * (page - 1);
  const endIndex = startIndex + COMMENTS_PER_PAGE;

  return (
    <>
      <Typography color="primary" variant="h3" fontSize="24px">
        Komentarze - {comments.length}
      </Typography>
      <Stack spacing={2} my={2}>
        <CommentAdder postId={postId} />
        {comments.slice(startIndex, endIndex).map((comment) => (
          <Comment
            authorNickname={comment.authorNickname}
            body={comment.body}
            creationDate={comment.creationDate}
            id={comment.id}
            key={comment.id}
          />
        ))}
        <Box display="flex" justifyContent="center">
          <Pagination
            count={pages}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            color="primary"
          />
        </Box>
      </Stack>
    </>
  );
};
