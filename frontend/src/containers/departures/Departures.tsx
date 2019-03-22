import React from "react";

import { fetchDepartures } from "../../api/departures";
import { IPlatform } from "../../api/departures/types";
import Platform from "./components/Platform";

interface IDeparturesState {
    isLoading: boolean;
    platforms: IPlatform[];
}

const FETCH_DEPARTURES_INTERVAL = 30_000;

class Departures extends React.PureComponent<{}, IDeparturesState> {
    fetchDeparturesInterval?: number;

    state: IDeparturesState = {
        isLoading: true,
        platforms: [],
    };

    componentDidMount() {
        document.addEventListener("visibilitychange", this.onFocus, false);

        this.getDepartures();

        this.fetchDeparturesInterval = setInterval(this.getDepartures, FETCH_DEPARTURES_INTERVAL);
    }

    componentWillUnmount() {
        window.removeEventListener("visibilitychange", this.onFocus);

        clearInterval(this.fetchDeparturesInterval);
    }

    onFocus = () => {
        if (document.visibilityState === "hidden") {
            console.log("hidden");
        } else if (document.visibilityState === "visible") {
            console.log("visible");
        }
    };

    getDepartures = async () => {
        console.log("fetch departures");

        const response = await fetchDepartures("NSR:StopPlace:58195");

        this.setState({
            isLoading: false,
            platforms: response.platforms,
        });
    };

    render() {
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
