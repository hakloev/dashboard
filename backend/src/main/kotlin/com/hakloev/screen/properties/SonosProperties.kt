package com.hakloev.screen.properties

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties("sonos")
class SonosProperties {

    lateinit var clientId: String
    lateinit var secretKey: String
    lateinit var baseUrl: String
    lateinit var authorizationUrl: String

}