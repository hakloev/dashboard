package com.hakloev.screen.controller

import com.hakloev.screen.api.entur.EnturApi
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class EnturController(private val enturApi: EnturApi) {

    @GetMapping("/stop", produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun stop(@RequestParam("stopPlace") stopPlace: String): String? {
        // TODO: Handle the case of stopPlace being blank
        return enturApi.getStopPlaceWithEstimatedCalls(stopPlace)
    }
    
}