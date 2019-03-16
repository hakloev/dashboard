package com.hakloev.screen.model.entur

import com.hakloev.screen.api.entur.model.response.Quay

data class Platform(
        val name: String,
        val description: String,
        val transportMode: String,
        val departures: List<Departure>
) {

    companion object {

        fun fromQuay(quay: Quay): Platform {
            val departures = quay.estimatedCalls.map { Departure.fromEstimatedCall(it) }

            return Platform(
                    quay.publicCode,
                    quay.description,
                    quay.stopPlace.transportMode ?: "unknown",
                    departures
            )
        }
    }
}
