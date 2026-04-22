import { useSnackbar } from "notistack";

import { type ChangeEvent, useState } from "react";

import { Button, Fade, Stack, TextField, Typography } from "@mui/material";

import { useSearchParamState } from "@app/hooks/index";
import { addCommentToSupabase } from "@app/services/supabase/supabaseService";
import { type Comment } from "@app/types";

const CommentItem = ({ comment }: { comment: Comment }) => (
  <Stack
    key={comment.id}
    sx={{ border: "1px solid #e0e0e0", p: 2, borderRadius: 2 }}
  >
    <Typography variant="body1">{comment.text}</Typography>
    <Typography variant="body2">
      Posted by {comment.name || "Anonymous"} on{" "}
      {new Date(comment.created_at).toLocaleString()}
    </Typography>
  </Stack>
);

const AddComment = () => {
  const { id } = useSearchParamState();

  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [showAddComment, setShowAddComment] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!comment || !name) {
      enqueueSnackbar("Please enter a comment and name", { variant: "error" });
      setError("Please enter a comment and name");
      return;
    }

    try {
      setLoading(true);
      await addCommentToSupabase({ text: comment, cover_id: id, name });
      setComment("");
      setError("");
    } catch (error) {
      setError((error as Error)?.message || "An unknown error occurred");
      enqueueSnackbar((error as Error)?.message || "An unknown error occurred", {
        variant: "error",
      });
    } finally {
      setLoading(false);
      setShowAddComment(false);
    }
  };

  return (
    <Stack sx={{ width: "100%", mb: 2 }}>
      {showAddComment ? (
        <Button
          variant="outlined"
          onClick={() => setShowAddComment(!showAddComment)}
        >
          Add a comment
        </Button>
      ) : (
        <Fade in={!showAddComment}>
          <Stack>
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Add a comment
              </Typography>
              <TextField
                multiline
                rows={2}
                sx={{ width: "100%" }}
                label="Comment"
                value={comment}
                onChange={handleChange}
                disabled={loading}
                error={!!error}
              />
              <Stack sx={{ mt: 2 }}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    disabled={loading}
                    error={!!error}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    disabled={loading}
                    onClick={() => setShowAddComment(!showAddComment)}
                  >
                    Cancel
                  </Button>
                </Stack>
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
              </Stack>
            </form>
          </Stack>
        </Fade>
      )}
    </Stack>
  );
};

const CommentList = ({ comments }: { comments: Comment[] }) => (
  <Stack gap={1}>
    {comments?.length && comments.length > 0 ? (
      comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))
    ) : (
      <Typography>No comments yet</Typography>
    )}
  </Stack>
);

const CoverComments = ({ comments }: { comments: Comment[] }) => (
  <Stack sx={{ width: "100%" }}>
    <AddComment />
    <CommentList comments={comments} />
  </Stack>
);

export default CoverComments;
