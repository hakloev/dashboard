package com.hakloev.screen.api.entur

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.hakloev.screen.api.entur.model.response.StopPlaceResponse
import com.hakloev.screen.graphql.GraphQLBuilder
import org.apache.http.HttpHeaders
import org.apache.http.client.methods.HttpPost
import org.apache.http.entity.ContentType
import org.apache.http.entity.StringEntity
import org.apache.http.impl.client.HttpClientBuilder
import org.springframework.stereotype.Service
import java.io.File

@Service
class EnturApi {

    private val objectMapper = jacksonObjectMapper()
    private val httpClient = HttpClientBuilder.create().build()

    fun getStopPlaceWithEstimatedCalls(stopPlaceId: String): String? {
        val queryResource = File(javaClass.getResource("/graphql/journeyplanner/stopplace.graphql").file)

        val query = GraphQLBuilder
                .fromResource(queryResource)
                .variable("id", stopPlaceId)
                .variable("filterByInUse", true)
                .build()

        val request = HttpPost(BASE_URI + JOURNEY_PLANNER_URI).apply {

            addHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON.mimeType)
            addHeader(HttpHeaders.ACCEPT, ContentType.APPLICATION_JSON.mimeType)
            addHeader("ET-Client-Name", ET_CLIENT_NAME)

            entity = StringEntity(query)

        }

        val stopPlaceResponse = with(httpClient.execute(request)) {
            // TODO: Handle the case of status code != 200
            objectMapper.readValue<StopPlaceResponse>(entity.content, StopPlaceResponse::class.java)
        }

        return objectMapper.writeValueAsString(stopPlaceResponse)
    }

    companion object {
        const val ET_CLIENT_NAME = "hakloev-dashboard"
        const val BASE_URI = "https://api.entur.io"
        const val JOURNEY_PLANNER_URI = "/journey-planner/v2/graphql"
    }
}