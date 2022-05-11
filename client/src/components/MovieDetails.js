import React, {useState} from 'react';
import {useQuery } from "@apollo/client";
import { getMovieQuery } from "../queries/queries";
// import {flowRight as compose} from 'lodash';
import { graphql } from '@apollo/client/react/hoc';
import MovieList from "./MovieList";


const MovieDetails = ({ movieID }) => {
    const { loading, error, data } = useQuery(getMovieQuery, {
        skip: !movieID,
        variables: { id: movieID}
     });
     let content;

     if (loading) content = <p className='movie-status'>Loading...</p>;
     else if (error) content = <p className='movie-status'>Error :</p>;
     else if (!movieID) content = <p className='movie-status'>No Movie selected</p>;
     else {
        const {
           movie: { name, genre, director }
        } = data;
  
        const movies = director.movies.map(({ id, name }) => {
           return <li key={id}>{name}</li>;
        });
        content = (
           <div className=''>
              <h2 className='movie-status'>{name}</h2>
              <p className='movie-dets'>Genre: {genre}</p>
              <p className='movie-dets'>Director: {director.name}</p>
              <p className='movie-dets'>All Movies by {director.name}</p>
              <ul className="other-movies">{movies}</ul>
           </div>
        );
     }
    return (
        <div id="movie-details">{content}</div>
    );    
}
    
export default MovieDetails;
    