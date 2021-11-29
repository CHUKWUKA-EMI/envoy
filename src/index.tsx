import "emoji-mart/css/emoji-mart.css";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./state/store";
import { Provider } from "react-redux";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import dotenv from "dotenv";
import Users from "./components/Users";
import MessageContainer from "./components/MessageContainer";
import { io } from "socket.io-client";

dotenv.config();

const socket = io(process.env.REACT_APP_CHAT_URL!);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App socket={socket} />}>
          <Route path="login" element={<Login socket={socket} />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="people" element={<Users />} />
          <Route
            path="messages"
            element={<MessageContainer socket={socket} />}
          />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
