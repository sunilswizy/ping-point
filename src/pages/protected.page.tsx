import { Navigate } from "react-router-dom";

interface ProductRouteProps {
  children: React.ReactNode;
}

const ProductRoute: React.FC<ProductRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default ProductRoute;
