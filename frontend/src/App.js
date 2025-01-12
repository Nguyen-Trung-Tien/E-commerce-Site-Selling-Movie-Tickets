import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes/index";
import DefaultComponent from "./component/DefaultComponent/DefaultComponent";
function App() {
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all`
      );
      console.log(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
