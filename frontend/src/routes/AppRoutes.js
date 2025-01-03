import { Route, Routes } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/login";
import MovieDetail from "../page/MovieDetail";
import TableUsers from "../components/TableUsers";
import Register from "../page/register";
import PrivateRoute from "./PrivatRoute";
import Admin from "../Admin/pages/AdminHome";
import Booking from "../page/Booking";
import Payment from "../page/Payment";
import About from "../page/about";
import NotFound from "./NotFound";
import UserManagement from "../Admin/pages/UserManagement";
import ShowtimeManagement from "../Admin/pages/ShowtimeManagement";
import BookingManagement from "../Admin/pages/BookingManagement";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/about" element={<About />} />

        <Route path="/MovieDetail" element={<MovieDetail />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route
          path="/admin/showtime-management"
          element={<ShowtimeManagement />}
        />
        <Route
          path="/admin/booking-management"
          element={<BookingManagement />}
        />

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
