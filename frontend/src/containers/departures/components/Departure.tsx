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

const DestinationWrapper = styled.div`
    flex: 1;
`;

const Destination = styled.p`
    margin: 0;
    margin-right: 2em;
    color: white;
`;

const Time = styled.p`
    color: white;
    margin: 0;
`;

const PlannedDeparture = styled(Time)`
    font-size: 0.8em;
    margin-right: 1em;
`;

const ActualDeparture = styled(Time)`
    font-size: 1.2em;
`;

const HUMAN_TIME_THRESHOLD_IN_SECONDS = 60 * 4;
const NOW_THRESHOLD_IN_SECONDS = 60;

function getFormattedDepartureTime(time: string, realtime: boolean = false): string {
    const date = moment(time);
    const diff = moment.duration(date.diff(moment.now()));

    const diffInSeconds = diff.asSeconds();

    if (diffInSeconds < NOW_THRESHOLD_IN_SECONDS) {
        return "nå";
    } else if (diffInSeconds < HUMAN_TIME_THRESHOLD_IN_SECONDS) {
        const minutes = diff.minutes();
        return realtime ? `ca ${minutes} min` : `${minutes} min`;
    } else {
        return date.format("HH:mm");
    }
}

function getPlannedDepartureTime(time: string): string {
    return `Rutetid: ${moment(time).format("HH:mm")}`;
}

function Departure(props: { departure: IDeparture }) {
    const { departure } = props;

    const departureTime = getFormattedDepartureTime(departure.plannedDeparture, departure.realtime);
    const plannedDepartureTime = getPlannedDepartureTime(departure.plannedDeparture);

    return (
        <Wrapper>
            <LineNumber backgroundColor={departure.line.lineColor}>
                {departure.line.number}
            </LineNumber>
            <DestinationWrapper>
                <Destination>{departure.line.name}</Destination>
                <PlannedDeparture>{plannedDepartureTime}</PlannedDeparture>
            </DestinationWrapper>
            <ActualDeparture>{departureTime}</ActualDeparture>
        </Wrapper>
    );
}

export default Departure;
