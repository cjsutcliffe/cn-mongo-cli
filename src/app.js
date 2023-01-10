const {client,connect} = require("./db/connection");
const yargs = require('yargs');
const Movie = require('./utils/index')

async function app(yargsObject) {
    const movieCollection = await connect();
    if (yargsObject.create) {
        // code to create a movie goes here
        console.log("Entering create");
        const newMovie = new Movie (yargsObject.title, yargsObject.actor, yargsObject.director);
        await newMovie.create(movieCollection);
    } else if(yargsObject.update) {
        // code to update the actor or director in a movie
        console.log("Entering update");
    } else if(yargsObject.read) {
        // code to list all the movies
        console.log("Entering read");
    } else if(yargsObject.delete) {
        // code to delete a movie https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteOne/
        console.log("Entering delete");
        const query = { title: yargsObject.title };
        console.log("query in delete: ",typeof(query));
        const result = await movieCollection.deleteOne(query);
        console.log(result);
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one film.");
          } else {
            console.log("No films matched the query. Deleted 0 films.");
          }
    } else {
        console.log("Command not recognised")
    };
    await client.close();
};

app(yargs.argv);
