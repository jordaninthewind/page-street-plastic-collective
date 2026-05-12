import { useSnackbar } from "notistack";

import { type ChangeEvent, useState } from "react";

import { TextField } from "@mui/material";

import { useSearchParamState } from "@app/hooks/index";
import { addCommentToSupabase } from "@app/services/supabase/supabaseService";
import { type Comment } from "@app/types";

const CommentItem = ({ comment }: { comment: Comment }) => (
  <div className="comment-item">
    <p className="comment-text">{comment.text}</p>
    <p className="comment-meta">
      {comment.name || "Anonymous"} &mdash; {new Date(comment.created_at).toLocaleString()}
    </p>
  </div>
);

const AddComment = () => {
  const { id } = useSearchParamState();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
    } catch (err) {
      setError((err as Error)?.message || "An unknown error occurred");
      enqueueSnackbar((err as Error)?.message || "An unknown error occurred", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button className="map-btn" onClick={() => setShowForm(true)}>
        Add a comment
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span className="map-field-label">Add a comment</span>
      <TextField
        multiline
        rows={2}
        fullWidth
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={loading}
        error={!!error}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          error={!!error}
          fullWidth
        />
        <button type="submit" className="map-btn map-btn--fill" style={{ width: "auto", padding: "0 20px" }} disabled={loading}>
          Submit
        </button>
        <button
          type="button"
          className="map-btn"
          style={{ width: "auto", padding: "0 16px" }}
          disabled={loading}
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
      {error && <p className="cover-details-meta" style={{ color: "#c00" }}>{error}</p>}
    </form>
  );
};

const CommentList = ({ comments }: { comments: Comment[] }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {comments?.length > 0 ? (
      comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
    ) : (
      <p className="cover-details-meta">No comments yet</p>
    )}
  </div>
);

const CoverComments = ({ comments }: { comments: Comment[] }) => (
  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
    <div className="eyebrow">Comments</div>
    <AddComment />
    <CommentList comments={comments} />
  </div>
);

export default CoverComments;
