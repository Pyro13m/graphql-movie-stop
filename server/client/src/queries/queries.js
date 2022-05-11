import { gql } from "@apollo/client";

const getDirectorsQuery = gql`
  {
    directors{
      name,
      id
    }
  }
`

const getMoviesQuery = gql`
  {
    movies{
      name,
      id 
    }
  }
`

const addMovieMutation = gql`
  mutation($name: String!, $genre: String!, $directorID: ID!){
    addMovie(name: $name, genre: $genre, directorID: $directorID){
        name, id
    }
  }
`

const getMovieQuery = gql`
  query($id: ID){
    movie(id: $id){
      id
      name
      genre
      director{
        id
        name
        age
        movies{
          name
          id
        }
      }
    }
  }
`

export { getDirectorsQuery, getMoviesQuery, addMovieMutation, getMovieQuery };