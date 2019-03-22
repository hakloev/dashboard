export interface IDeparturesResponse {
    platforms: IPlatform[];
}

export interface IPlatform {
    name: string;
    description: string;
    transportMode: "bus" | "tram";
    departures: IDeparture[];
}

export interface IDeparture {
    realtime: boolean;
    cancelled: boolean;
    plannedArrival: string;
    plannedDeparture: string;
    line: ILine;
}

export interface ILine {
    name: string;
    number: string;
    lineColor: string;
}
