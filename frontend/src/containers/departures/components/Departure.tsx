import moment from "moment";
import React from "react";
import styled from "styled-components";

import { IDeparture } from "../../../api/departures/types";

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-left;
    align-items: center;
    margin-left: 1em;
    padding: 0.2em 0;
`;

const LineNumber = styled.p<{ backgroundColor: string }>`
    background-color: ${props => `#${props.backgroundColor}`};
    padding: 0.1em 0.8em;
    margin: 0;
    margin-right: 1em;
    color: white;
    font-weight: bold;
`;

const Destination = styled.p`
    flex: 1;
    margin: 0;
    margin-right: 2em;
    color: white;
`;

const Time = styled.p`
    color: white;
    margin: 0;
    font-size: 1.2em;
`;

const TIME_TO_STOP_IN_SECONDS = 60 * 4;
const LIMIT_OF_NOW_IN_SECONDS = 60;

function Departure(props: { departure: IDeparture }) {
    const { departure } = props;

    const departureTime = moment(departure.plannedDeparture);
    const diffFromNow = moment.duration(departureTime.diff(moment()));

    const departureTimeString =
        diffFromNow.asSeconds() < TIME_TO_STOP_IN_SECONDS
            ? diffFromNow.asSeconds() < LIMIT_OF_NOW_IN_SECONDS
                ? "nå"
                : diffFromNow.minutes() + " min"
            : departureTime.format("HH:mm");

    let originalDepartureTime;

    if (diffFromNow.asSeconds() < TIME_TO_STOP_IN_SECONDS) {
        originalDepartureTime = `(${departureTime.format("HH:mm")}) `;
    }

    return (
        <Wrapper>
            <LineNumber backgroundColor={departure.line.lineColor}>
                {departure.line.number}
            </LineNumber>
            <Destination>{departure.line.name}</Destination>
            <Time>
                {originalDepartureTime}
                {departureTimeString}
            </Time>
        </Wrapper>
    );
}

export default Departure;
