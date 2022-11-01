import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import { isLoggedInVar } from "./store/cache";
import { ACCESS_TOKEN } from "./utils/constants";
import { showToastTop } from "./utils/helpers";
import { IdleTimer } from "./utils/IdleTimer";

function App() {
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 120, //expire after 5 min
      onTimeout: () => {
        callLogoutUser();
      },
      onExpired: () => {
        // do something if expired on load
        callLogoutUser();
      },
    });

    return () => {
      timer.cleanUp();
    };
  }, []);

  const callLogoutUser = () => {
    showToastTop(`Session Expired, Login again!`, false, {
      autoClose: false,
      position: "top-center",
    });
    localStorage.removeItem(ACCESS_TOKEN);
    // Set the logged-in status to false
    isLoggedInVar(false);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Auth />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-contacts" element={<Users />} />
              <Route path="/contacts" element={<Users />} />
              <Route path="/users" element={<Users />} />
              <Route path="/roles" element={<Users />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
