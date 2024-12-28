import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/home.page";
import MainLayout from "./layout/main.layout";
import LoginPage from "./pages/login.page";
import ProductRoute from "./pages/protected.page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="chat/:chatId" element={<HomePage />} />
      <Route
        index
        element={
          <ProductRoute>
            <HomePage />
          </ProductRoute>
        }
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
