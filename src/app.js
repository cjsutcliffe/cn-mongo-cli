const {client,connect} = require("./db/connection");
const yargs = require('yargs');
const Movie = require('./utils/index')

async function app(yargsObject) {
    const movieCollection = await connect();
   
    if (yargsObject.create) {
        // code to create a movie goes here
        console.log("Entering create");
        const newMovie = new Movie (yargsObject.title, yargsObject.actor, yargsObject.director, yargsObject.rating);
        await newMovie.create(movieCollection);
   
    } else if(yargsObject.replace) {
        // code to replace the actor, director or rating in a movie
        console.log("Entering update");
        const query = { title: yargsObject.title };
        const replacement = { title: yargsObject.title, actor: yargsObject.actor, director: yargsObject.director, rating: yargsObject.rating}
        const result = await movieCollection.replaceOne(query, replacement);

    } else if(yargsObject.update) {
        // code to update the actor or director in a movie https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/
        console.log("Entering update");
        const query = {title: yargsObject.title};
        //updates actor, director and rating - if a yarg is not defined updates, to null...
        const update ={$set: { actor: yargsObject.actor, director: yargsObject.director, rating: yargsObject.rating}};
        const result = await movieCollection.updateOne(query, update);
        console.log(result);
        if (result.modifiedCount === 1) {
            console.log ("Updated successfully");
        } else {
            console.log("update unsuccessful");
        }

    } else if(yargsObject.read) {
        // code to show details for a specific movie https://www.mongodb.com/docs/drivers/node/current/usage-examples/findOne/
        console.log("Entering read");
        const query = { title: yargsObject.title };
        const result = await movieCollection.findOne(query);
        console.log("Film Title:",(result.title));
        console.log("Lead Actor:",(result.actor));
        console.log("Directed by:",(result.director));
        console.log("Critics Rating:",typeof(result.rating));
    
    } else if(yargsObject.list) {
        // code to list all the movies https://www.mongodb.com/docs/drivers/node/current/usage-examples/find/
        console.log("Entering list");
        const results = await movieCollection.find({}).toArray();
        console.table(results);

    } else if(yargsObject.delete) {
        // code to delete a movie https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteOne/
        // console.log("Entering delete");
        const query = { title: yargsObject.title };
        // console.log("query in delete: ",typeof(query));
        const result = await movieCollection.deleteOne(query);
        // console.log(result);
        if (result.deletedCount === 1) {
            console.log("Successfully deleted 1 film.");
          } else {
            console.log("No films matched the query. Deleted 0 films.");
          }
    } else {
        console.log("Command not recognised")
    };
    await client.close();
};

app(yargs.argv);
