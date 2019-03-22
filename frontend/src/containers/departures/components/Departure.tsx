import moment from "moment";
import React from "react";
import styled from "styled-components";

import { IDeparture } from "../../../api/departures/types";

const DepartureWrapper = styled.div`
    display: flex;
    justify-content: flex-left;
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
    flex: 1;
    color: white;
    margin: 0;
    margin-right: 2em;
`;

const DepartureTime = styled.p`
    color: white;
    margin: 0;
    margin-right: 0.4em;
    font-size: 1.3em;
`;

const TIME_TO_STOP_IN_SECONDS = 60 * 4;
const LIMIT_OF_NOW_IN_SECONDS = 30;

function Departure(props: { departure: IDeparture }) {
    const { departure } = props;

    const departureTime = moment(departure.plannedDeparture);
    const diffFromNow = moment.duration(departureTime.diff(moment())).asSeconds();

    const departureTimeString =
        diffFromNow > TIME_TO_STOP_IN_SECONDS
            ? departureTime.format("HH:mm")
            : diffFromNow < LIMIT_OF_NOW_IN_SECONDS
            ? "nå"
            : diffFromNow + " min";

    return (
        <DepartureWrapper>
            <DepartureLineNumber backgroundColor={departure.line.lineColor}>
                {departure.line.number}
            </DepartureLineNumber>
            <DepartureDestination>{departure.line.name}</DepartureDestination>
            <DepartureTime>
                {diffFromNow < TIME_TO_STOP_IN_SECONDS && "(" + departureTime.format("HH:mm") + ")"}
                {departureTimeString}
            </DepartureTime>
        </DepartureWrapper>
    );
}

export default Departure;
