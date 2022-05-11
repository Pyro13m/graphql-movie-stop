import React, {useState} from 'react';
import {useQuery, useMutation } from "@apollo/client";
import { getDirectorsQuery, addMovieMutation, getMoviesQuery } from "../queries/queries";
import {flowRight as compose} from 'lodash';
import { graphql } from '@apollo/client/react/hoc';

//making gql query for react and binding the query to the component to access the data coming from the query. 

function AddMovie() {
  // const {loading, error, data} = useQuery(getMoviesQuery);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error </p>;
  // console.log(data);
  const {loading, error, data} = useQuery(getDirectorsQuery);
  const [addMovie, { newData }] = useMutation(addMovieMutation);
  const displayDirectors = () =>{
    if (loading) return <option disabled>Loading...</option>;
    if (error) return <option disabled>Error Loading Directors</option>;
    if(data){
        const { directors } = data;
        return directors.map((director) => {
            return (<option key={ director.id } value={ director.id }> { director.name } </option>);
        })}
    }

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [directorId, setDirectorId] = useState('');
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(name, genre, directorId);
        addMovie({
            variables:{
                name: name,
                genre: genre,
                directorID: directorId
            },
            refetchQueries: [{ query: getMoviesQuery }]
        });
    }

      return (
          <form id="add-movie" onSubmit={handleSubmit}>
              <div className="field">
                  <label>Movie Name:</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className="field">
                  <label>Genre:</label>
                  <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} ></input>
              </div>
              <div className="field">
                  <label>Director:</label>
                  <select value={directorId} onChange={(e) => setDirectorId(e.target.value)} >
                      <option>Select Director</option>
                      { displayDirectors() }
                  </select>
              </div>
              <button className='button-1'>Add Movie</button>
          </form>
        
      );
    } 

//   }
  
export default compose(
    graphql(getDirectorsQuery, {name: "getDirectorsQuery"}),
    graphql(addMovieMutation, {name: "addMovieMutation"})
    )(AddMovie);
