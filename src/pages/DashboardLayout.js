import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { useState } from "react";

// This component provides the main layout for the dashboard, including the sidebar and main content area.
function DashboardLayout() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <button className="sidebar-toggle" onClick={() => setSidebarOpen((v) => !v)}>
        {sidebarOpen ? '✖' : '☰'}
      </button>
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)}>
        <h2 style={{ textTransform: 'uppercase', letterSpacing: 1 }}>Admin Dashboard</h2>
        <nav>
          <Link to="/" style={{ textTransform: 'uppercase' }}>Home</Link>
          <Link to="/users" style={{ textTransform: 'uppercase' }}>Users</Link>
          <Link to="/posts" style={{ textTransform: 'uppercase' }}>Posts</Link>
          <Link to="/albums" style={{ textTransform: 'uppercase' }}>Albums</Link>
          <Link to="/todos" style={{ textTransform: 'uppercase' }}>Todos</Link>
        </nav>
        <button onClick={logout} className="btn danger mt-16">Logout</button>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;