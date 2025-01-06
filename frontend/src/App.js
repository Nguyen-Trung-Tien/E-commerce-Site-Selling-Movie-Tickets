import "./App.scss";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useSelector, useDispatch } from "react-redux";
import { handleRefresh } from "./redux/actions/userAction";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, []);

  // useEffect(() => {
  //   fetchApi();
  // });

  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_API_URL}/product/get-all`);
  };

  const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
