class Movie {
    constructor (inputTitle, inputActor = "Not Specified", inputDirector = "Not Specified", inputRating = "unspecified") {
        this.title = inputTitle;
        this.actor = inputActor;
        this.director = inputDirector;
        this.rating = inputRating;
    };
    
    async create (movieCollection) {
        console.log("Entering add within index.js");
        //code to save a movie to the database here;
        await movieCollection.insertOne(this);
    };
   
    async delete (movieCollection) {
        console.log("Entering remove within index.js");
        //code to save a movie to the database here;
        await movieCollection.deleteOne(this);
    };



};

module.exports = Movie;