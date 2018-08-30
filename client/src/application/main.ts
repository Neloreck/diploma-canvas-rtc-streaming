import * as React from "react";
import {render} from "react-dom";

import {Application} from "./Application";

import "@App/assets/style/global.scss";

// === Rendering app instance.

render(React.createElement(Application), document.getElementById("application-root"));
