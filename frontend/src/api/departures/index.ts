import { IDeparturesResponse } from "./types";

const baseURL = "http://192.168.86.135:8080/api/entur";

export async function fetchDepartures(stopPlace: string): Promise<IDeparturesResponse> {
    try {
        const response = await fetch(baseURL + `/departures?transportModes=metro&stopPlace=${stopPlace}`);
        return await response.json();
    } catch (error) {
        return error;
    }
}
