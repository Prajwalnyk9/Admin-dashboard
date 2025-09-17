import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import UsersPage from "./features/users/UsersPage";
import PostsPage from "./features/posts/PostsPage";
import TodosPage from "./features/todos/TodosPage";
import AlbumsPage from "./features/albums/AlbumsPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  // Check if the user is logged in by looking for a flag in localStorage.
  // If not logged in, we'll redirect them to the login page.
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<HomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="albums" element={<AlbumsPage />} />
          <Route path="todos" element={<TodosPage />} />
          <Route path="*" element={<ErrorPage message="Page not found." />} />
        </Route>
        <Route path="*" element={<ErrorPage message="Page not found." />} />
      </Routes>
    </Router>
  );
}

export default App;
