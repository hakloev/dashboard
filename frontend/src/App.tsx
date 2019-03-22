import React from "react";

import "./styles.scss";

import Clock from "./components/Clock";
import Departures from "./containers/departures/Departures";

export default function App() {
    return (
        <React.Fragment>
            <Clock />
            <Departures />
        </React.Fragment>
    );
}
