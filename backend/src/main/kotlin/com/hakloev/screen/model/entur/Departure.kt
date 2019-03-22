package com.hakloev.screen.model.entur

import com.hakloev.screen.api.entur.model.response.EstimatedCall

data class Departure(
        val realtime: Boolean,
        var cancelled: Boolean,
        val plannedArrival: String,
        val plannedDeparture: String,
        val line: Line
) {

    companion object {

        fun fromEstimatedCall(estimatedCall: EstimatedCall): Departure {
            val line = Line.fromDestinationDisplayAndServiceJourney(
                    estimatedCall.destinationDisplay,
                    estimatedCall.serviceJourney
            )

            return Departure(
                    estimatedCall.realtime,
                    estimatedCall.cancellation,
                    estimatedCall.aimedArrivalTime,
                    estimatedCall.aimedDepartureTime,
                    line
            )
        }

    }

}
