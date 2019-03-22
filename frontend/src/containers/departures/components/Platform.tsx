import React from "react";
import styled from "styled-components";

import { IPlatform } from "../../../api/departures/types";
import Departure from "./Departure";

const PlatformWrapper = styled.section`
    background-color: #808d92;
    padding: 1em;
    margin: 1em;
`;

const PlatformHeader = styled.h1`
    color: white;
    margin-top: 0;
`;

function Platform(props: { platform: IPlatform }) {
    const { platform } = props;

    const departures = platform.departures.map(departure => (
        <Departure key={departure.line.name + departure.plannedArrival} departure={departure} />
    ));

    return (
        <PlatformWrapper>
            <PlatformHeader>{platform.description}</PlatformHeader>
            {departures}
        </PlatformWrapper>
    );
}

export default Platform;
