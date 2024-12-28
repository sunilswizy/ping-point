import "./login.styles.css";
import { Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { postData } from "../../service/api-service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      messageApi.error("Username and password are required");
      return;
    }

    if (!isLoginPage && password !== confirmPassword) {
      messageApi.error("Passwords do not match");
      return;
    }

    try {
      const response = await postData(
        `users/${isLoginPage ? "login" : "signup"}`,
        { username, password }
      );

      if (response.message) {
        messageApi.error(response.message);
        return;
      }

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.userDetails));
      navigate("/");
    } catch (error: any) {
      messageApi.error(error.message);
    }
  };

  const changePageType = () => {
    setIsLoginPage((prev) => !prev);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-page">
      {contextHolder}
      <div className="login-container">
        <div className="header">
          <h1>{isLoginPage ? "Welcome back" : "Welcome"}</h1>
          <p>
            {isLoginPage
              ? "Sign in to continue ping point"
              : "Sign up to start with ping point"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group" hidden={isLoginPage}>
            <Input.Password
              placeholder="Confirm password"
              prefix={<LockOutlined />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            {isLoginPage ? "Login" : "Sign up"}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        <div className="signup-text" onClick={changePageType}>
          {isLoginPage ? "Don't have an account?" : "Already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default Login;
