import React from "react";

import { hydrate } from "react-dom";
import LoginPage from "./pages/LoginPage";

hydrate(<LoginPage />, document.getElementById("root"));
