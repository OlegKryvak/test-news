import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./localization/i18n";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </BrowserRouter>
);
