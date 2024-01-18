import React from "react";
// import ReactDOM from 'react-dom'; The new way to import createRoot:
import { createRoot } from "react-dom/client";
import store from "./app/store";
import { Provider } from "react-redux";
import "tachyons";

import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

registerServiceWorker();
