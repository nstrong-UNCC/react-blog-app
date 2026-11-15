
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";

function IndividualPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch the individual blog post
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPost() {
      setLoading(true);
      setError("");
      setPost(null);
      setUser(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await response.json();

        if (!data.id) {
          throw new Error("Post not found");
        }

        setPost(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching post:", error);
          setError("Unable to load this post.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPost();

    return () => controller.abort();
  }, [id]);

  // Fetch the author associated with the post
  useEffect(() => {
    if (!post?.userId) return;

    const controller = new AbortController();

    async function fetchUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${post.userId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching user:", error);
        }
      }
    }

    fetchUser();

    return () => controller.abort();
  }, [post]);

  // Fetch comments associated with the post
  useEffect(() => {
    const controller = new AbortController();

    async function fetchComments() {
      setComments([]);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching comments:", error);
        }
      }
    }

    fetchComments();

    return () => controller.abort();
  }, [id]);

  // Submit a new comment using POST
  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !commentText.trim()) {
      alert("Please enter your name and comment.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            postId: Number(id),
            name: name.trim(),
            body: commentText.trim()
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newComment = await response.json();

      // Add the new comment to the displayed list
      setComments((previousComments) => [
        ...previousComments,
        newComment
      ]);

      setName("");
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Unable to submit your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main>
        <h2>Loading post...</h2>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main>
        <h1>Post Not Found</h1>
        <Link to="/">Back to Blog Posts</Link>
      </main>
    );
  }

  return (
    <main>
      <article className="article-container">
        <div className="article-header">
          <div>
            {user ? (
              <>
                {user.name} · {user.email}
              </>
            ) : (
              "Loading author..."
            )}
          </div>
        </div>

        <div className="article-body">
          <h1>{post.title}</h1>
          <p>{post.body}</p>

          <Link to="/" className="btn">
            Back to Blog Posts
          </Link>
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments</h2>

        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <h4>{comment.name}</h4>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        )}

        <h3>Leave a Comment</h3>

        <form onSubmit={handleSubmit} className="comment-form">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label htmlFor="comment">Comment</label>

          <textarea
            id="comment"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            required
          />

          <button
            type="submit"
            className="btn"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default IndividualPostPage;
