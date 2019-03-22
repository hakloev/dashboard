package com.hakloev.screen.api.entur.model.response

data class EstimatedCall(
        val realtime: Boolean,
        val aimedArrivalTime: String,
        val aimedDepartureTime: String,
        val cancellation: Boolean,
        val destinationDisplay: DestinationDisplay,
        val serviceJourney: ServiceJourney
)