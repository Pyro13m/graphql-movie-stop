const express = require('express');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const cors = require('cors');

//edit the username password and Collection
// create acc https://cloud.mongodb.com
const DB = "mongodb+srv://<UserName>:<Password>@gql.ahrbf.mongodb.net/<Collection>?retryWrites=true&w=majority";

const { graphqlHTTP } = require('express-graphql'); //it makes express understand the graphql and set up a graphql server
// will be used as a middleware on a single route(endpoint)

const app = express();

//allow cross origin request
app.use(cors());

mongoose.connect(DB);
mongoose.connection.once('open', () => {
    console.log("connected to database");
})

/**middleware to handle graphql requests when we go to the "/graphql" endpoint
the middleware requires schema about how our graph will look**/
app.use('/graphql', graphqlHTTP({
    //export the graphql schema here to use it as a property to work with
    schema,
    graphiql: true //interactive in-browser GraphQL IDE to see the request and structure
})); 

app.listen(4000, ()=> {
    console.log("Listening 4000");
});

