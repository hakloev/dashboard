package com.hakloev.screen.api.sonos.model.response

data class Group(
        val id: String,
        val playerIds: List<String>,
        val playbackState: String,
        val coordinatorId: String,
        val name: String
)