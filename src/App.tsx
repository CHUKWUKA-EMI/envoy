import { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAppDispatch } from "./state/hooks";
import { setUsers } from "./state/usersReducer";
import { loginUser } from "./state/loginReducer";
import { IUser, IUserProfile } from "./interfaces/User";
import { Socket } from "socket.io-client";
import { _getUsers } from "./services/network";

interface IAppProps {
  socket: Socket;
}

function App({ socket }: IAppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("envoy_user");

    if (userData) {
      const localUser = JSON.parse(userData) as IUserProfile;
      dispatch(loginUser(localUser));
      socket.emit("addUser", { userId: localUser.id });
    }
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, [socket]);

  useEffect(() => {
    const userData = localStorage.getItem("envoy_user");
    if (userData) {
      const localUser = JSON.parse(userData) as IUserProfile;
      if (localUser.authtoken) {
        (async () => {
          const users = await _getUsers();
          const usersData = users?.data.users as IUser[];
          dispatch(setUsers(usersData));
        })();
      }
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
