import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/component/css-js/css/index.css";
import "../src/component/css-js/css/main.css";
import "../src/component/css-js/css/home-standard.css";
import "../src/component/css-js/fonts/flaticon/flaticon.css";
import "../src/component/css-js/css/index.css";
import "../src/component/css-js/fonts/fontawesome/fontawesome.min.css";
import "../src/component/css-js/css/product-details.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/component/css-js/fonts/icofont/icofont.min.css";
import "../src/component/css-js/vendor/niceselect/nice-select.min.css";
import "../src/component/css-js/vendor/venobox/venobox.min.css";
import "../src/component/css-js/css/user-auth.css";
import "../src/component/css-js/css/orderlist.css";
import "../src/component/css-js/css/wallet.css";
import "../src/component/css-js/css/invoice.css";
import "../src/component/css-js/css/checkout.css";
import { BrowserRouter } from "react-router-dom";

// <link rel="stylesheet" to=""  />

//  js
// import "../src/component/css-js/vendor/bootstrap/jquery-1.12.4.min.js";
// import "../src/component/css-js/js/main.js";
// import "../src/component/css-js/vendor/slickslider/slick.min.js";
// import "../src/component/css-js/js/slick";
// import "../src/component/css-js/js/venobox.js";
// import "../src/component/css-js/js/accordion.js";
// import "../src/component/css-js/js/countdown.js";
// import "../src/component/css-js/js/nice-select.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
