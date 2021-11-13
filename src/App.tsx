import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAppDispatch } from "./state/hooks";
import { loginUser } from "./state/loginReducer";
import { IUserProfile } from "./interfaces/User";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const userData = localStorage.getItem("envoy_user");

    if (userData) {
      const localUser = JSON.parse(userData) as IUserProfile;
      dispatch(loginUser(localUser));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <nav>
        <Navbar />
      </nav>
      <div style={{ height: "90vh", marginLeft: "auto", marginRight: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
