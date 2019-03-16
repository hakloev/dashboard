package com.hakloev.screen.api.sonos.model.response

import com.fasterxml.jackson.annotation.JsonProperty

data class SonosAuthorizationResponse(
        @JsonProperty("access_token") val accessToken: String,
        @JsonProperty("token_type") val tokenType: String,
        @JsonProperty("refresh_token") val refreshToken: String,
        @JsonProperty("expires_in") val expiresIn: Int,
        val scope: String
)
