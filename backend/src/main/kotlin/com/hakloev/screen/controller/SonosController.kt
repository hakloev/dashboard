package com.hakloev.screen.controller

import com.hakloev.screen.api.sonos.SonosApi
import com.hakloev.screen.api.sonos.model.response.SonosAuthorizationResponse
import com.hakloev.screen.properties.SonosProperties
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.util.StringUtils
import org.springframework.web.bind.annotation.GetMapping
import javax.servlet.http.HttpSession
import javax.websocket.server.PathParam

@Controller
class SonosController(private val api: SonosApi, private val properties: SonosProperties) {

    private var authorizationMap = mutableMapOf<String, SonosAuthorizationResponse>()

    @GetMapping("/")
    fun main(model: Model, session: HttpSession): String {
        model["clientId"] = properties.clientId
        model["state"] = session.id

        if (authorizationMap.containsKey(session.id)) {
            model["accessKey"] = authorizationMap[session.id]!!.accessToken
        }

        return "sonos-main"
    }

    @GetMapping("/sonos-code-redirect")
    fun sonosRedirect(@PathParam("state") state: String, @PathParam("code") code: String, session: HttpSession): String {
        if (StringUtils.isEmpty(state) || StringUtils.isEmpty(code)) {
            throw Exception()
        }

        if (!state.contentEquals(session.id)) {
            throw Exception()
        }

        val response = api.authorizeUser(code)
        authorizationMap[state] = response

        return "redirect:/"
    }

    @GetMapping("/sonos/list-devices")
    fun listDevices(session: HttpSession): String {
        val token = authorizationMap[session.id]!!.accessToken

        val households = api.getHouseholds(token)
        val groups = api.getGroups(token, households.households.first().id)

        return "test"
    }

}