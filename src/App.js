import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./components/Auth/Auth";
import MainLayout from "./components/MainLayout/MainLayout";
import useIdleTimer from "./hooks/useIdleTimer";
import useLogout from "./hooks/useLogout";
import Contacts from "./pages/Contacts/Contacts";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import MyContacts from "./pages/MyContacts/MyContacts";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import RoleDetails from "./pages/RoleDetails/RoleDetails";
import Roles from "./pages/Roles/Roles";
import Settings from "./pages/Settings/Settings";
import UserDetails from "./pages/UserDetails/UserDetails";
import Users from "./pages/Users/Users";
import { userPermissions } from "./store/cache";
import { PERMISSIONS } from "./utils/constants";
import { showToastTop } from "./utils/helpers";

function App() {
  const { logout } = useLogout();

  useIdleTimer(() => {
    //callLogoutUser();
  }, 3000);

  const callLogoutUser = () => {
    showToastTop(`Session Expired, Login again!`, false, {
      autoClose: false,
      position: "top-center",
    });
    logout();
  };

  useEffect(() => {
    const permissions = localStorage.getItem(PERMISSIONS);
    if (permissions) {
      userPermissions(permissions);
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Auth />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-contacts" element={<MyContacts />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:uuid" element={<UserDetails />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/roles/:uuid" element={<RoleDetails />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
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
