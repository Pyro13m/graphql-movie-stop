import {useQuery } from "@apollo/client";
import { getMoviesQuery } from "../queries/queries";
import { useState } from 'react';
import { graphql } from '@apollo/client/react/hoc';

import MovieDetails  from "../components/MovieDetails"

//making gql query for react and binding the query to the component to access the data coming from the query. 
 
function MovieList() {
  const {loading, error, data} = useQuery(getMoviesQuery);
  const [ selected, setSelected ] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  // console.log(data);
    return (
      <div className="movie-body">
        <ul id="movie-list">
          {data.movies.map(movie => (
            <li key={movie.id} onClick={(e) =>{setSelected(movie.id)}}>{movie.name}</li>
          ))}
        </ul>
        <MovieDetails movieID={selected} />
      </div>
    );
  }
  
  export default graphql(getMoviesQuery)(MovieList);
  