package com.hakloev.screen.model.entur

import com.hakloev.screen.api.entur.model.response.EstimatedCall

data class Departure(
        val realtime: Boolean,
        val plannedArrival: String,
        val plannedDeparture: String,
        val line: String,
        val lineNumber: String
) {

    companion object {

        fun fromEstimatedCall(estimatedCall: EstimatedCall): Departure {
            return Departure(
                    estimatedCall.realtime,
                    estimatedCall.aimedArrivalTime,
                    estimatedCall.aimedDepartureTime,
                    estimatedCall.serviceJourney.line.name,
                    estimatedCall.serviceJourney.line.publicCode
            )
        }

    }

}
