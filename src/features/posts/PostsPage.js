import React, { useEffect, useState } from "react";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [totalCount, setTotalCount] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    const key = `posts_page_${page}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      try { setPosts(JSON.parse(cached)); } catch {}
    }
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`, { method: 'GET' })
      .then(async (res) => {
        const data = await res.json();
        setPosts(data);
        localStorage.setItem(key, JSON.stringify(data));
        // Try to get total count from headers (JSONPlaceholder doesn't support it, fallback to 100)
        const total = res.headers.get('x-total-count');
        setTotalCount(total ? parseInt(total, 10) : 100);
      })
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  }, [page]);

  const loadComments = (postId) => {
    if (selectedPost === postId) {
      setSelectedPost(null);
      setComments([]);
      setCommentsLoading(false);
      return;
    }
    setComments([]);
    setCommentsLoading(true);
    setSelectedPost(postId);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setCommentsLoading(false);
      })
      .catch(() => {
        setComments([]);
        setCommentsLoading(false);
      });
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}>
      <h2 className="mb-16" style={{ textAlign: 'center', fontWeight: 700, textTransform: 'uppercase' }}>Posts</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <input
          className="input"
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 320, width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ddd' }}
        />
      </div>
      <div className="row mb-8" style={{ flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <div className="row" style={{ gap: 8, alignItems: 'center' }}>
          <button
            className="btn secondary"
            style={{ padding: '6px 18px', borderRadius: 6 }}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="pill" style={{ fontWeight: 500, fontSize: 15 }}>Page {page}</span>
          <button
            className="btn"
            style={{ padding: '6px 18px', borderRadius: 6 }}
            onClick={() => setPage((p) => p + 1)}
            disabled={totalCount !== null && page >= Math.ceil(totalCount / 10)}
          >
            Next
          </button>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 16, fontWeight: 500 }}>
        {totalCount !== null && (
          <>
            Showing {posts.length} of {totalCount} posts
          </>
        )}
      </div>
      {loading && <p className="muted" style={{ textAlign: 'center' }}>Loading posts…</p>}
      {error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}
      {filtered.map((p) => (
        <div key={p.id} className="card mb-12" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 20, marginBottom: 18 }}>
          <h3 style={{ margin: 0 }}>{p.title}</h3>
          <p className="mt-8" style={{ color: '#374151', fontSize: 16 }}>{p.body}</p>
          <button onClick={() => loadComments(p.id)} className="btn-link mt-12" style={{ color: '#6366f1', fontWeight: 600, marginTop: 10 }}>
            {selectedPost === p.id ? 'Close Comments' : 'View Comments'}
          </button>
          {selectedPost === p.id && (
            <ul className="mt-12" style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', background: '#f9fafb', borderRadius: 8, padding: 12 }}>
              {commentsLoading && <li style={{ color: '#6b7280' }}>Loading comments…</li>}
              {!commentsLoading && comments.length === 0 && <li style={{ color: '#6b7280' }}>No comments.</li>}
              {!commentsLoading && comments.map((c) => (
                <li key={c.id} style={{ marginBottom: 10, color: '#374151', fontSize: 15 }}>💬 {c.body}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostsPage;