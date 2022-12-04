import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function LogInPage({ setAdmin }) {
  const navigate = useNavigate();
  const adminCredentials = useSelector((state) => state.AdminCredentials);
  const [username, setUserNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column  align-items-center w-75">
        <h1>ADMIN</h1>
        <form
          autoComplete="off"
          className="w-100"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              adminCredentials[0].username === username &&
              adminCredentials[0].password === password
            ) {
              setAdmin(username);
              navigate("/admin");
            }
          }}
        >
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              value={username}
              onChange={(e) => {
                setUserNumber(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogInPage;
