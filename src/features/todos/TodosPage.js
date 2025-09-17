import { useEffect, useState } from "react";

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const key = "todos_all";
    const cached = localStorage.getItem(key);
    if (cached) {
      try { setTodos(JSON.parse(cached)); } catch {}
    }
  fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        localStorage.setItem(key, JSON.stringify(data));
      })
      .catch(() => setError("Failed to load todos"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = todos.filter((t) =>
    filter === "completed" ? t.completed : filter === "pending" ? !t.completed : true
  );

  const toggleTodo = (id) => {
    setTodos((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      localStorage.setItem("todos_all", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '16px' }}>
      <h2 className="mb-16" style={{ textAlign: 'center', fontWeight: 700, textTransform: 'uppercase' }}>Todos</h2>
      {loading && <p className="muted" style={{ textAlign: 'center' }}>Loading todos…</p>}
      {error && <p className="error" style={{ textAlign: 'center' }}>{error}</p>}
      <div className="todo-toolbar mb-16" style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
        <button onClick={() => setFilter("all")} className={`btn secondary${filter === 'all' ? ' active' : ''}`} style={{ padding: '6px 18px', borderRadius: 6, fontWeight: filter === 'all' ? 700 : 500 }}>All</button>
        <button onClick={() => setFilter("completed")} className={`btn secondary${filter === 'completed' ? ' active' : ''}`} style={{ padding: '6px 18px', borderRadius: 6, fontWeight: filter === 'completed' ? 700 : 500 }}>Completed</button>
        <button onClick={() => setFilter("pending")} className={`btn secondary${filter === 'pending' ? ' active' : ''}`} style={{ padding: '6px 18px', borderRadius: 6, fontWeight: filter === 'pending' ? 700 : 500 }}>Pending</button>
      </div>
      <ul className="todo-list" style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
        {filtered.map((t) => (
          <li key={t.id} className="todo-item" style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '12px 16px', marginBottom: 12 }}>
            <input type="checkbox" checked={t.completed} onChange={() => toggleTodo(t.id)} style={{ width: 18, height: 18 }} />
            <span className="todo-title" style={{ flex: 1, color: t.completed ? '#6b7280' : '#111827', textDecoration: t.completed ? 'line-through' : 'none', fontSize: 16 }}>{t.title}</span>
            <span className={`pill ${t.completed ? 'todo-completed' : 'todo-pending'}`} style={{ background: t.completed ? '#d1fae5' : '#fee2e2', color: t.completed ? '#065f46' : '#991b1b', padding: '2px 10px', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
              {t.completed ? 'Completed' : 'Pending'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodosPage;