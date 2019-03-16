package com.hakloev.screen.api.sonos.model.response

data class Player(
        val id: String,
        val name: String,
        val restUrl: String,
        val deviceIds: List<String>
)