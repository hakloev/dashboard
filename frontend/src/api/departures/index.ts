import { DeparturesResponse } from "./types";

const baseURL ='http://localhost:8080/api/entur'

export async function fetchDepartures(stopPlace: string): Promise<DeparturesResponse> {
  try {
    const response = await fetch(baseURL + `/departures?transportModes=metro,tram&stopPlace=${stopPlace}`)
    return await response.json()
  } catch (error) {
    return error
  }
}