import { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const url=process.env.REACT_APP_FIREBASE_API

  const fetchMoviesHandler = useCallback(async () =>
  {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url+'/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedMovies=[]
      for(const key in data)
      {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }
      setMovies(loadedMovies);
    }
    catch (error)
    {
      setError(error.message)
    }
    setIsLoading(false)
  }, []);

  useEffect(() =>
  {
    fetchMoviesHandler()
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie)
  {
    const response = await fetch(url+'/movies.json',{
      method: 'post',
      body: JSON.stringify(movie)
    })
    const data=await response.json()
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
