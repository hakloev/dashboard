package com.hakloev.screen.api.sonos.model.response

data class GroupsResponse(
        val players: List<Player>,
        val groups: List<Group>
)