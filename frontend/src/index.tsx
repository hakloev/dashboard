import moment, { } from "moment";
import "moment/locale/nb";
import * as React from "react";
import ReactDOM from "react-dom";

import App from "./App";

moment.locale("nb");

ReactDOM.render(<App />, document.getElementById("root"));
