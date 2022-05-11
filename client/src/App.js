import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import MovieList from "./components/MovieList";
import AddMovie from './components/AddMovie';
//we need apollo clent(which is a graphql client) for us to connect the react frontend to our graphql server as it is not javascript
// to be recognized by our react app.

//apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
     cache: new InMemoryCache( ),
});

function App() {
  return (
    <ApolloProvider client={client}> 
    {/* dynamically setting up the client we will be making requests to */}
      <div className="main">
        <h1>Movie List</h1>
        <MovieList />
        <AddMovie />
      </div>
    </ApolloProvider>
  );
}

export default App;
