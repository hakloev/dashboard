import React from "react";
import styled from "styled-components";

import Departures from "./containers/departures/Departures";
import Header from "./containers/header/Header";

import "./styles.scss";

const Body = styled.div`
    padding: 1em 2em;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    return (
        <Body>
            <Header />
            <Row>
                <Departures />
                <Column>
                    <h1>te</h1>
                    <h1>t</h1>
                </Column>
            </Row>
        </Body>
    );
}
