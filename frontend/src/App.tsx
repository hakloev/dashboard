import React from "react";
import styled from "styled-components";

import "./styles.scss";

import Clock from "./components/Clock";
import Departures from "./containers/departures/Departures";

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

export default function App() {
    return (
        <React.Fragment>
            <Row>
                <Clock />
            </Row>
            <Row>
                <Departures />
            </Row>
        </React.Fragment>
    );
}
