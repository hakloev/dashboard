import moment from "moment";
import React from "react";
import styled from "styled-components";

import { fetchDepartures } from "../../api/departures";
import { IPlatform } from "../../api/departures/types";
import Platform from "./components/Platform";

interface IDeparturesState {
    isLoading: boolean;
    platforms: IPlatform[];
    lastUpdated?: Date;
    updateUiTimestamp: Date;
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-right: 2em;
`;

const LastUpdated = styled.p`
    margin: 0;
`;

const FETCH_DEPARTURES_INTERVAL = 60_000;
const UPDATE_UI_INTERVAL = 5_000;

class Departures extends React.PureComponent<{}, IDeparturesState> {

    fetchDeparturesInterval?: number;
    updateUiInterval?: number;

    state: IDeparturesState = {
        isLoading: true,
        lastUpdated: undefined,
        platforms: [],
        updateUiTimestamp: new Date(),
    };

    componentDidMount() {
        document.addEventListener("visibilitychange", this.onFocus);
        this.getDepartures();
        this.setupIntervals();
    }

    componentWillUnmount() {
        document.removeEventListener("visibilitychange", this.onFocus);
        this.clearIntervals();
    }

    setupIntervals = () => {
        this.fetchDeparturesInterval = setInterval(
            this.getDepartures,
            FETCH_DEPARTURES_INTERVAL,
        );

        this.updateUiInterval = setInterval(
            () => this.setState({ updateUiTimestamp: new Date() }),
            UPDATE_UI_INTERVAL,
        );
    }

    clearIntervals = () => {
        clearInterval(this.fetchDeparturesInterval);
        clearInterval(this.updateUiInterval);
    }

    onFocus = () => {
        if (document.visibilityState === "visible") {
            this.getDepartures();
            this.setupIntervals();
        } else if (document.visibilityState === "hidden") {
            this.clearIntervals();
        }
    }

    getDepartures = async () => {
        // TODO: Add error handling
        this.setState({ isLoading: true });
        const response = await fetchDepartures("NSR:StopPlace:58195");

        this.setState({
            isLoading: false,
            lastUpdated: new Date(),
            platforms: response.platforms,
        });
    }

    render() {
        if (this.state.isLoading && this.state.platforms.length === 0) {
            return (
                <Container>
                    <h1>Laster...</h1>;
                </Container>
            );
        }

        const platforms = this.state.platforms.map(platform => <Platform key={platform.name} platform={platform} />);
        const lastUpdated = this.state.lastUpdated
            ? moment(this.state.lastUpdated).format("HH:mm:ss")
            : "aldri";

        return (
            <Container>
                {platforms}
                <LastUpdated>{`Sist oppdatert: ${lastUpdated}`}</LastUpdated>
            </Container>
        );
    }
}

export default Departures;
