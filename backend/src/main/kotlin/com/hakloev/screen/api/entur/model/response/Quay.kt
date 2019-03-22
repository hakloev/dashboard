package com.hakloev.screen.api.entur.model.response

data class Quay(
        val publicCode: String,
        val description: String,
        val stopPlace: StopPlace,
        val estimatedCalls: List<EstimatedCall>
)