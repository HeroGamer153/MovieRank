import React from 'react';

const MovieCard = (props) => {
  const movie = props.movie;
  const FavoriteComponent = props.favoriteComponent;
  const handleFavoriteClick = () => {
    props.handleFavoriteClick(movie);
  };

  return (
    <div className="movie" onClick={handleFavoriteClick}>
      <div>
        <p>{movie.Year}</p>
        <h1>
          <FavoriteComponent/>
        </h1>
      </div>
      <div>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          alt={movie.Title}
        />
      </div>
      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;