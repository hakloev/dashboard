import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import { fetchDepartures } from './api/departures';
import { IDeparture, IPlatform } from './api/departures/types';

interface IDeparturesState {
    isLoading: boolean;
    platforms: IPlatform[];
}

const DepartureHeader = styled.p`
    color: white;
`;

function Departure(props: { departure: IDeparture }) {
    const { departure } = props;

    return (
        <div>
            <DepartureHeader>{departure.lineNumber + ' ' + departure.line}</DepartureHeader>
            <p>{moment(departure.plannedDeparture).format('HH:mm')}</p>
        </div>
    );
}

const PlatformWrapper = styled.div`
    background-color: #808d92;
`;

function Platform(props: { platform: IPlatform }) {
    const { platform } = props;

    return (
        <PlatformWrapper>
            <h1>{platform.name + ' ' + platform.transportMode}</h1>
            {platform.departures.map(departure => (
                <Departure key={departure.plannedArrival} departure={departure} />
            ))}
        </PlatformWrapper>
    );
}

const FETCH_DEPARTURES_INTERVAL = 30_000;

class Departures extends React.PureComponent<{}, IDeparturesState> {
    public fetchDeparturesInterval?: number;

    public state: IDeparturesState = {
        isLoading: true,
        platforms: [],
    };

    public componentDidMount() {
        document.addEventListener('visibilitychange', this.onFocus, false);

        this.getDepartures();

        this.fetchDeparturesInterval = setInterval(this.getDepartures, FETCH_DEPARTURES_INTERVAL);
    }

    public componentWillUnmount() {
        window.removeEventListener('visibilitychange', this.onFocus);

        clearInterval(this.fetchDeparturesInterval);
    }

    public onFocus = () => {
        if (document.visibilityState === 'hidden') {
            console.log('hidden');
        } else if (document.visibilityState === 'visible') {
            console.log('visible');
        }
    };

    public getDepartures = async () => {
        console.log('fetch departures');

        const response = await fetchDepartures('NSR:StopPlace:58195');

        this.setState({
            isLoading: false,
            platforms: response.platforms,
        });
    };

    public render() {
        if (this.state.isLoading) {
            return <h1>laster...</h1>;
        }

        return (
            <React.Fragment>
                {this.state.platforms.map(platform => (
                    <Platform key={platform.name} platform={platform} />
                ))}
            </React.Fragment>
        );
    }
}

export default Departures;
