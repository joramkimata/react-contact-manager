import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/MainLayout/MainLayout";
import useIdleTimer from "./hooks/useIdleTimer";
import useLogout from "./hooks/useLogout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Users from "./pages/Users/Users";
import { showToastTop } from "./utils/helpers";

function App() {
  const { logout } = useLogout();

  useIdleTimer(() => {
    callLogoutUser();
  });

  const callLogoutUser = () => {
    showToastTop(`Session Expired, Login again!`, false, {
      autoClose: false,
      position: "top-center",
    });
    logout();
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
