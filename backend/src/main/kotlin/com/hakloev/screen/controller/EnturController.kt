package com.hakloev.screen.controller

import com.hakloev.screen.api.entur.EnturApi
import com.hakloev.screen.model.entur.DeparturesResponse
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/entur")
class EnturController(private val enturApi: EnturApi) {

    @GetMapping("/departures", produces = [MediaType.APPLICATION_JSON_UTF8_VALUE])
    fun getDepartures(
            @RequestParam("stopPlace") stopPlace: String,
            @RequestParam("transportModes") transportModes: List<String>
    ): DeparturesResponse {
        // TODO: Handle the case of stopPlace being blank
        // TODO: Handle the case of transportModes being blank
        return enturApi.getDepartures(stopPlace, transportModes)
    }
    
}