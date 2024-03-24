import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./data/store";
import { setUser } from "./data/features/userInfoSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo) {
  store.dispatch(setUser(userInfo));
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
