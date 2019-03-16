package com.hakloev.screen.api

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.hakloev.screen.model.SonosAuthorizationResponse
import com.hakloev.screen.properties.SonosProperties
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpPost
import org.apache.http.impl.client.HttpClientBuilder
import org.springframework.stereotype.Service
import java.util.*

@Service
class SonosApi(private val properties: SonosProperties) {

    private val objectMapper = jacksonObjectMapper().apply {
        registerModule(JavaTimeModule())
        disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
    }

    private val httpClient = HttpClientBuilder.create().build()

    fun authorizeUser(code: String): SonosAuthorizationResponse {
        val authorizationString = "${properties.clientId}:${properties.secretKey}"
        val rawBase64encodedClientIdAndSecretKey = Base64.getEncoder().encode(authorizationString.toByteArray())
        val encodedClientIdAndSecret = String(rawBase64encodedClientIdAndSecretKey)

        val post = HttpPost("${properties.authorizationUrl}/access?grant_type=authorization_code&code=$code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fsonos-code-redirect")
        post.setHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
        post.setHeader("Authorization", "Basic $encodedClientIdAndSecret")

        with(httpClient.execute(post)) {
            if (statusLine.statusCode != 200) {
                throw Exception("Bad request") // TODO: Add correct exception
            }

            return objectMapper.readValue(entity.content, SonosAuthorizationResponse::class.java)
        }
    }

    fun getHouseholds(token: String): HouseholdResponse {
        val get = HttpGet("${properties.baseUrl}/households")
        get.setHeader("Content-Type", "application/json")
        get.setHeader("Authorization", "Bearer $token")

        with(httpClient.execute(get)) {
            if (statusLine.statusCode != 200) {
                throw Exception("Bad request") // TODO: Add correct exception
            }

            return objectMapper.readValue(entity.content, HouseholdResponse::class.java)
        }
    }

    fun getGroups(token: String, householdId: String): GroupsResponse {
        val get = HttpGet("${properties.baseUrl}/$householdId/groups")
        get.setHeader("Content-Type", "application/json")
        get.setHeader("Authorization", "Bearer $token")

        with(httpClient.execute(get)) {
            if (statusLine.statusCode != 200) {
                throw Exception("Bad request") // TODO: Add correct exception
            }

            return objectMapper.readValue(entity.content, GroupsResponse::class.java)
        }
    }

    data class HouseholdResponse(val households: List<Household>)

    data class Household(val id: String)

    data class GroupsResponse(
            val players: List<Player>,
            val groups: List<Group>
    )

    data class Group(
            val id: String,
            val playerIds: List<String>,
            val playbackState: String,
            val coordinatorId: String,
            val name: String
    )

    data class Player(
            val id: String,
            val name: String,
            val restUrl: String,
            val deviceIds: List<String>
    )
}