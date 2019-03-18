export type DeparturesResponse = {
  platforms: Platform[],
}

export type Platform = {
  name: string,
  description: string,
  transportMode: 'bus' | 'tram',
  departures: Departure[],
}

export type Departure = {
  line: string,
  lineNumber: string,
  plannedArrival: string,
  plannedDeparture: string,
  realtime: boolean
}