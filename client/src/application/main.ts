import "@App/assets/style/global.scss";
import "reflect-metadata";

import * as React from "react";
import {render} from "react-dom";

import {Application} from "./Application";

// === Rendering app instance.

render(React.createElement(Application), document.getElementById("application-root"));
