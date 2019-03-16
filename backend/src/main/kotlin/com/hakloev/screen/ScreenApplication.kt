package com.hakloev.screen

import com.hakloev.screen.properties.SonosProperties
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableConfigurationProperties(SonosProperties::class)
class ScreenApplication

fun main(args: Array<String>) {
	runApplication<ScreenApplication>(*args)
}

