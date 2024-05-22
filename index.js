/* setting up a graphql server using express-graphql ,an HTTP middleware that will be leveraged by Express to rapidly create our API and express*/
const express = require("express")
const graphqlHTTP = require("express-graphql")
const buildSchema = require('graphql')
const path = require("path")

// where JOSN files will be stored
const bookFiles = path.join(__dirname, "resources");

// defining  Graphql schema
const schema = buildSchema(
    `type Query{
        getBook(title: string!): Book
    }
    type Book{
        title: String
        author: String
        pages: [PageTokens]
    }
    `
)
