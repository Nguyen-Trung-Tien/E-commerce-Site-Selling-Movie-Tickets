import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/login';
import TableUsers from '../components/TableUsers';
import Register from '../components/register';
import PrivateRoute from './PrivatRoute';
import NotFound from './NotFound';
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/users"
                    element={
                        <PrivateRoute >
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={< NotFound />}></Route>
            </Routes >

        </>
    )
}

export default AppRoutes;