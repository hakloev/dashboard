export interface IDeparturesResponse {
    platforms: IPlatform[];
}

export interface IPlatform {
    name: string;
    description: string;
    transportMode: 'bus' | 'tram';
    departures: IDeparture[];
}

export interface IDeparture {
    line: string;
    lineNumber: string;
    plannedArrival: string;
    plannedDeparture: string;
    realtime: boolean;
}
