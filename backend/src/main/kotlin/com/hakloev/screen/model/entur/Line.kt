package com.hakloev.screen.model.entur

import com.hakloev.screen.api.entur.model.response.DestinationDisplay
import com.hakloev.screen.api.entur.model.response.ServiceJourney

data class Line(
        val name: String,
        val number: String,
        val lineColor: String
) {

     companion object {

         fun fromDestinationDisplayAndServiceJourney(destinationDisplay: DestinationDisplay, serviceJourney: ServiceJourney): Line {
             return Line (
                     destinationDisplay.frontText,
                     serviceJourney.line.publicCode,
                     serviceJourney.line.presentation.colour
             )
         }

     }

}
