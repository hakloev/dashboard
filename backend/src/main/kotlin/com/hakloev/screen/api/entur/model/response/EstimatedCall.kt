package com.hakloev.screen.api.entur.model.response

data class EstimatedCall(
        val aimedArrivalTime: String,
        val aimedDepartureTime: String,
        val realtime: Boolean,
        val serviceJourney: ServiceJourney
)