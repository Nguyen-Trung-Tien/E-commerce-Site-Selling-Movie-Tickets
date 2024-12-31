import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/login";
import ProductDetail from "../page/ProductDetail";
import TableUsers from "../components/TableUsers";
import Register from "../page/register";
import PrivateRoute from "./PrivatRoute";
import NotFound from "./NotFound";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ProductDetail" element={<ProductDetail />} />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
