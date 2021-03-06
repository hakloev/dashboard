import React from "react";
import styled from "styled-components";

import { IPlatform } from "../../../api/departures/types";
import Departure from "./Departure";

const Wrapper = styled.div`
    background-color: #808d92;
    padding: 0.5em 1em;
    margin-bottom: 0.5em;
`;

const Description = styled.h1`
    color: white;
    margin: 0;
`;

function Platform(props: { platform: IPlatform }) {
    const { platform } = props;

    const departures = platform.departures.map(departure => (
        <Departure
            key={departure.line.name + departure.plannedArrival}
            departure={departure}
        />
    ));

    return (
        <Wrapper>
            <Description>{platform.description}</Description>
            {departures}
        </Wrapper>
    );
}

export default Platform;
