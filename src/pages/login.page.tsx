import { Navigate } from "react-router-dom";
import Login from "../components/login/login.component";

const LoginPage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
