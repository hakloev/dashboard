import React from "react";
import styled from "styled-components";

import Departures from "./containers/departures/Departures";
import Header from "./containers/header/Header";

import "./styles.scss";

const Body = styled.div`
    flex-direction: column;
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
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ flex: 1 }}>
                        <span>here be weather</span>
                    </div>
                    <div style={{ flex: 1 }}>
                        <span>here be tweet</span>
                    </div>
                </div>

            </Row>
        </Body>
    );
}
