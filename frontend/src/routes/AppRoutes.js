import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/login";
import MovieDetail from "../page/MovieDetail";
import TableUsers from "../components/TableUsers";
import Register from "../page/register";
import PrivateRoute from "./PrivatRoute";
// import Admin from "../Admin/layouts/Admin";
import About from "../page/about";
import NotFound from "./NotFound";
// import UserManagement from "../Admin/pages/UserManagement"; // Updated import path

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        <Route path="/MovieDetail" element={<MovieDetail />} />
        {/* <Route path="/admin/user-management" element={<UserManagement />} /> */}

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
