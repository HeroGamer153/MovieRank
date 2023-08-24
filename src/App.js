import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import MovieCard from './MovieCard';
import AddFavorites from './AddFavorites';
import RankPage from './RankPage';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=c31dd6bd';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showRankPage, setShowRankPage] = useState(false);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    // Perform initial search or any other desired functionality
    searchMovies(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    setFavorites(movieFavorites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const updatedFavoriteList = favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
    setFavorites(updatedFavoriteList);
    saveToLocalStorage(updatedFavoriteList);
  };

  const handleRankButtonClick = () => {
    setShowRankPage(true);
  };

  return (
    <Router>
      <div className="app">
        <h1>HeroRates</h1>

        <div className="buttons">
          <Link to="/"><button>Home</button></Link>
          <Link to="/favorites"><button>Favorites</button></Link>
          <button className="rank-button" onClick={() => setShowRankPage(true)}>Rank</button>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <div className="search">
                <input
                  placeholder="Search for movies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      searchMovies(searchTerm);
                    }
                  }}
                ></input>
                <img
                  src={SearchIcon}
                  alt="search"
                  onClick={() => searchMovies(searchTerm)}
                ></img>
              </div>

              {movies?.length > 0 ? (
                <div className="container">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      handleFavoriteClick={addFavoriteMovie}
                      favoriteComponent={AddFavorites}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty">
                  <h2>No movies found</h2>
                </div>
              )}
            </>
          } />

          <Route path="/favorites" element={showRankPage ? <RankPage favorites={favorites} /> : (
            <div className="container">
              {favorites.length > 0 ? (
                favorites.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    handleFavoriteClick={removeFavoriteMovie}
                    favoriteComponent={AddFavorites}
                  />
                ))
              ) : (
                <div className="empty">
                  <h2>No favorite movies found</h2>
                </div>
              )}
            </div>
          )} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;