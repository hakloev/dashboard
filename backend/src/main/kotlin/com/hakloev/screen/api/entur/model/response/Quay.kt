package com.hakloev.screen.api.entur.model.response

data class Quay(
        val description: String,
        val publicCode: String,
        val estimatedCalls: List<EstimatedCall>,
        val stopPlace: StopPlace
)