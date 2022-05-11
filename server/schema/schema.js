const graphql = require('graphql');
const _ = require('lodash'); 
const Movie = require('../models/movies');
const Director = require('../models/directors');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql; //grab all the necessary graphql properties

// dummy data
// var movies = [
//     { name: 'Movie 1', genre: 'genre 1', id: '1', directorID: '1'},
//     { name: 'Movie 2', genre: 'genre 2', id: '2', directorID: '2'},
//     { name: 'Movie 3', genre: 'genre 3', id: '3', directorID: '3'},
//     { name: 'Movie 4', genre: 'genre 4', id: '4', directorID: '2'},
//     { name: 'Movie 5', genre: 'genre 2', id: '2', directorID: '2'},
//     { name: 'Movie 6', genre: 'genre 3', id: '3', directorID: '3'},
//     { name: 'Movie 7', genre: 'genre 4', id: '4', directorID: '4'}
// ]

// var directors = [
//     { name: 'Name 1', age: 1, id: '1'},
//     { name: 'Name 2', age: 2, id: '2'},
//     { name: 'Name 3', age: 3, id: '3'},
//     { name: 'Name 4', age: 4, id: '4'}
// ]

const MovieType = new GraphQLObjectType({
    name : "Movie",
    fields: () => ({
        // fields is wrapped around a function as DirectorType won't be available on page load(top-to-bottom execution)
        // so as the function gets executed at sometime only when the entire page is loaded and the whole code is executed
        // hence, making DirectorType Available
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args){
                // console.log(parent);
                // return _.find(directors, { id: parent.directorID });
                return Director.findById(parent.directorID)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                // return _.filter(movies, {directorID : parent.id});
                return Movie.find({ directorID: parent.id });
            }

        }
    })
})

// root queries: entry queries on how the user can enter the graph 
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        movie: {
            // query to get a single movie
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //code to get data from db/other source
                // return _.find(movies, { id: args.id });
                return Movie.findById(args.id);
            }
        },
        director: {
            // query to get a single director
            type: DirectorType,
            args: { id: { type: GraphQLID} },
            resolve(parent, args){
                // return _.find(directors, {id: args.id});
                return Director.findById(args.id);
            }
        },
        movies : {
            // query to get list of books
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                // return movies;
                return Movie.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                // return directors;
                return Director.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let director = new Director({
                    name: args.name,
                    age: args.age
                }); //local object variable of Director model type
                return director.save();
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorID: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorID: args.directorID
                });
                return movie.save();
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    // passing the initial root query
    query: RootQuery,
    mutation: Mutation
})