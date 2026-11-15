
import { Link } from "react-router";
import { useEffect, useState } from "react";

function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Unable to load blog posts.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <main><h2>Loading posts...</h2></main>;
  }

  if (error) {
    return <main><p>{error}</p></main>;
  }

  return (
    <main>
      <h1>Web Dev Circle</h1>

      <div className="articles-wrapper">
        {posts.map((post) => (
          <article className="article-container" key={post.id}>
            <div className="article-header">
              <div>Post #{post.id}</div>
            </div>

            <div className="article-body">
              <h3>{post.title}</h3>

              <p>
                {post.body.length > 200
                  ? post.body.substring(0, 200) + "..."
                  : post.body}
              </p>

              <Link to={`/post/${post.id}`} className="btn">
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default BlogPostsPage;
