import { useState } from "react";
import { useNavigate } from "react-router-dom";

// This is the login page. It lets users log in with their email or mobile number and a password.
function LoginPage() {
  // Store the values the user types into the form fields.
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if the password is strong enough: at least 1 uppercase, 1 number, 1 special character, and 6+ characters.
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    return regex.test(pwd);
  };

  // Check if the input is a valid email or a 10-digit mobile number.
  const isEmail = (text) => /.+@.+\..+/.test(text);
  const isMobile = (text) => /^\d{10}$/.test(text);

  // When the user submits the form, check if everything is valid and log them in.
  const handleSubmit = (e) => {
    e.preventDefault();
    
  // If the password isn't strong, show an alert and stop.
    if (!validatePassword(password)) {
      alert("Password must contain 1 uppercase, 1 number, 1 special char");
      return;
    }
    
  // If the identifier isn't a valid email or mobile, show an alert and stop.
    if (!isEmail(identifier) && !isMobile(identifier)) {
      alert("Enter a valid email or 10-digit mobile number");
      return;
    }
    
  // If everything is valid, save the login state and go to the dashboard.
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify({ id: identifier }));
    navigate("/");
  };

  return (
    <div className="centered">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email or Mobile"
          className="input"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" style={{ width: "100%" }}>Login</button>
        <p className="muted mt-12">Password needs 1 uppercase, 1 number, 1 special character.</p>
      </form>
    </div>
  );
}

export default LoginPage;