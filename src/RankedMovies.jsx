import { Link } from 'react-router-dom';

const RankedMovies = ({ rankedMovies }) => {
  return (
    <div>
      <h2>Ranked Movies</h2>
      <ol>
        {rankedMovies.map((movie, index) => (
          <li key={movie.imdbID}>{movie.Title}</li>
        ))}
      </ol>
      <Link to="/favorites">Go Back to Favorites</Link>
    </div>
  );
};

export default RankedMovies;