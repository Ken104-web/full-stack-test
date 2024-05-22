/* setting up a graphql server using express-graphql ,an HTTP middleware that will be leveraged by Express to rapidly create our API and express*/
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import fs from 'fs';
import path from 'path'

const { title } = require("process")

// where JOSN files will be stored
const bookFiles = path.join(__dirname, "resources");

// defining  Graphql schema
const schema = buildSchema(
    `
    type Page {
        pageIndex:Int
        content: String
    }
    type Token {
        position:[Int]
        value: String
    }
    type PageWithTokens {
        pageIndex: Int
        content: String
        tokens:[Token]
    }
    type Query{
        getBook(title: string!): Book
    }
    type Book{
        title: String
        author: String
        pages: [PageWithTokens]
    }
    `
);
    // defining funtion for query type
    function getBook(title, bookFiles){
        // making a path for the requsted book
        const bookFilePath = path.join(bookFiles, `${title}.json`);
        try{
            const data = JSON.parse(fs.readFileSync(bookFilePath, 'utf8'));
            return data;
        } catch(error){
            throw new Error("Book not found");
        }
    }
    // resolver
    const root ={
        getBook: (title) => getBook(title, './books')
    };
    // creating an express server and graphql endpoint
    const app = express();
    app.use(
        '/graphql',
        graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphql: true,
        })
    );
    const PORT = 4000;
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });


