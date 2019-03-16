package com.hakloev.screen.api.entur.model.response

data class StopPlaceResponse(val data: StopPlaceData)

data class StopPlaceData(val stopPlace: StopPlace)

data class StopPlace(val quays: List<Quay>?, val transportMode: String?)

data class Quay(
        val description: String,
        val publicCode: String,
        val estimatedCalls: List<EstimatedCall>,
        val stopPlace: StopPlace
)

data class EstimatedCall(
        val aimedArrivalTime: String,
        val aimedDepartureTime: String,
        val realtime: Boolean,
        val serviceJourney: ServiceJourney
)

data class ServiceJourney(val line: Line)

data class Line(val name: String, val publicCode: String)
