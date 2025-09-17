import { Outlet, Link, useNavigate } from "react-router-dom";

// This component provides the main layout for the dashboard, including the sidebar and main content area.
function DashboardLayout() {
  const navigate = useNavigate();

  // When the user clicks logout, clear everything from localStorage and send them to the login page.
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      {/* Sidebar with navigation links */}
      <aside className="sidebar">
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
      {/* Main content area where the selected page will be rendered */}
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;