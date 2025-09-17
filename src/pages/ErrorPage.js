
// This is a simple error page component.
// It shows an error message and a button to go back.
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function ErrorPage({ message }) {
  const navigate = useNavigate();
  // Show the error message and a button to go back to the previous page.
  return (
    <div className="error-page-container">
      <h1 className="error-page-title">Oops!</h1>
      <p className="error-page-message">{message || "Something went wrong."}</p>
      <button
        className="error-page-btn"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}

// Export the ErrorPage component for use in routing.
export default ErrorPage;
