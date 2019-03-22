import moment from "moment";
import React from "react";
import styled from "styled-components";

import { IDeparture } from "../../../api/departures/types";

const DepartureWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1.75em;
    padding: 0.5em 0;
`;

const DepartureLineNumber = styled.p<{ backgroundColor: string }>`
    padding: 0.2em 1em;
    margin: 0;
    margin-right: 1em;
    background-color: ${props => `#${props.backgroundColor}`};
    font-weight: bold;
    color: white;
`;

const DepartureDestination = styled.p`
    color: white;
    margin: 0;
    margin-right: 0.4em;
`;

const DepartureTime = styled.p`
    color: white;
    margin: 0;
    margin-right: 0.4em;
    font-size: 1.3em;
`;

function Departure(props: { departure: IDeparture }) {
    const { departure } = props;

    return (
        <DepartureWrapper>
            <DepartureLineNumber backgroundColor={departure.line.lineColor}>
                {departure.line.number}
            </DepartureLineNumber>
            <DepartureDestination>{departure.line.name}</DepartureDestination>
            <DepartureTime>{moment(departure.plannedDeparture).format("HH:mm")}</DepartureTime>
        </DepartureWrapper>
    );
}

export default Departure;
