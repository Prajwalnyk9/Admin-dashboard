import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Table from "../../components/Table";
function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [relatedItems, setRelatedItems] = useState([]);
  const [query, setQuery] = useState("");
  const [relatedType, setRelatedType] = useState("posts");

  useEffect(() => {
    setLoading(true);
    setError("");
    const key = "users_all";
    const cached = localStorage.getItem(key);
    if (cached) {
      try { setUsers(JSON.parse(cached)); } catch {}
    }
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        localStorage.setItem(key, JSON.stringify(data));
      })
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const selectUser = (u) => {
    setSelectedUser(u);
    setRelatedItems([]);
  };

  useEffect(() => {
    if (!selectedUser) return;
    const endpoint = relatedType === "posts" ? "posts" : "todos";
    const key = `${endpoint}_user_${selectedUser.id}`;
    setError("");
    const cached = localStorage.getItem(key);
    if (cached) {
      try { setRelatedItems(JSON.parse(cached)); } catch {}
    }
    fetch(`https://jsonplaceholder.typicode.com/${endpoint}?userId=${selectedUser.id}`)
      .then((r) => r.json())
      .then((data) => {
        setRelatedItems(data);
        localStorage.setItem(key, JSON.stringify(data));
      })
      .catch(() => setError("Failed to load related items"));
  }, [selectedUser, relatedType]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="users-container">
      <h2 className="mb-16 users-title">Users</h2>
      <div className="row mb-16 users-search-row">
        <Input
          className="users-search-input"
          placeholder="Search by name or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
  {loading && <p className="muted" style={{ textAlign: 'center' }}>Loading users…</p>}
  {error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}
  <div className="users-table-scroll">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                onClick={() => selectUser(u)}
                className={`users-table-row${selectedUser && selectedUser.id === u.id ? ' selected' : ''}`}
              >
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  {selectedUser && (
        <div className="users-card mt-16">
          <div className="users-card-header">
            <h3 style={{ margin: 0 }}>{relatedType === "posts" ? `Posts by ${selectedUser.name}` : `Todos of ${selectedUser.name}`}</h3>
            <div className="row users-card-btn-row">
              <Button className={`users-card-btn${relatedType === 'posts' ? '' : ' secondary'}`} onClick={() => setRelatedType('posts')}>Posts</Button>
              <Button className={`users-card-btn${relatedType === 'todos' ? '' : ' secondary'}`} onClick={() => setRelatedType('todos')}>Todos</Button>
            </div>
          </div>
          <div className="users-card-content">
            {relatedType === 'posts' ? (
              <ul className="users-list">
                {relatedItems.map((p) => (
                  <li key={p.id} className="mb-8 users-list-item">
                    <strong>{p.title}</strong>
                    <div className="muted" style={{ color: '#6b7280', fontSize: 15 }}>{p.body}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="users-list">
                {relatedItems.map((t) => (
                  <li key={t.id} className="mb-8 users-list-item users-list-item-todo">
                    <span className={`users-pill${t.completed ? ' completed' : ' pending'}`}>
                      {t.completed ? 'Completed' : 'Pending'}
                    </span> {t.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;