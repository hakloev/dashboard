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
    time: Date;
}

const FETCH_DEPARTURES_INTERVAL = 30_000;
const UPDATE_UI_INTERVAL = 5_000;

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const LastUpdated = styled.p`
  margin: 0;
`;

class Departures extends React.PureComponent<{}, IDeparturesState> {
    fetchDeparturesInterval?: number;
    updateDeparturesInterval?: number;

    state: IDeparturesState = {
        isLoading: true,
        lastUpdated: undefined,
        platforms: [],
        time: new Date()
    };

    componentDidMount() {
        document.addEventListener("visibilitychange", this.onFocus, false);

        this.getDepartures();

        this.fetchDeparturesInterval = setInterval(
            this.getDepartures,
            FETCH_DEPARTURES_INTERVAL
        );
        this.updateDeparturesInterval = setInterval(
            () => this.setState({ time: new Date() }),
            UPDATE_UI_INTERVAL
        );
    }

    componentWillUnmount() {
        window.removeEventListener("visibilitychange", this.onFocus);

        clearInterval(this.fetchDeparturesInterval);
        clearInterval(this.updateDeparturesInterval);
    }

    onFocus = () => {
        if (document.visibilityState === "hidden") {
            console.log("hidden");
        } else if (document.visibilityState === "visible") {
            console.log("visible");
        }
    }

    getDepartures = async () => {
        const response = await fetchDepartures("NSR:StopPlace:58195");

        this.setState({
            isLoading: false,
            lastUpdated: new Date(),
            platforms: response.platforms
        });
    }

    render() {
        if (this.state.isLoading) {
            return <h1>laster...</h1>;
        }

        const platforms = this.state.platforms.map(platform => (
            <Platform key={platform.name} platform={platform} />
        ));

        const lastUpdated = this.state.lastUpdated
            ? moment(this.state.lastUpdated).format("HH:mm:ss")
            : "aldri"

        return (
            <Container>
                {platforms}
                <LastUpdated>{`Sist oppdatert: ${lastUpdated}`}</LastUpdated>
            </Container>
        );
    }
}

export default Departures;
