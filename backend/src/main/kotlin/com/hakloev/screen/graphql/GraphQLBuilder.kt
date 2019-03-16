package com.hakloev.screen.graphql

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import java.io.File
import java.nio.file.Files

class GraphQLBuilder(private val graphQQLQueryObject: GraphQLQueryObject) {

    data class GraphQLQueryObject(val query: String) {
        val variables: MutableMap<String, Any> = mutableMapOf()
    }

    fun variable(key: String, value: String) = apply {
        graphQQLQueryObject.variables[key] = value
    }

    fun variable(key: String, value: Boolean) = apply {
        graphQQLQueryObject.variables[key] = value
    }

    fun build(): String = let {
        jacksonObjectMapper().writeValueAsString(it.graphQQLQueryObject)
    }

    companion object {

        fun fromResource(file: File): GraphQLBuilder {
            val string = String(Files.readAllBytes(file.toPath()))
            return GraphQLBuilder(GraphQLQueryObject(string))
        }

    }
}
