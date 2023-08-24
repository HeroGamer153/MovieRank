import React, { useState, useEffect } from 'react';

const RankPage = ({ favorites }) => {
  const [rankings, setRankings] = useState([]);
  const [currentPair, setCurrentPair] = useState([]);
  const [currentComparison, setCurrentComparison] = useState([]);
  const [finishedRanking, setFinishedRanking] = useState(false);

  useEffect(() => {
    setRankings(favorites.map((movie) => ({ ...movie, score: 0 })));
  }, [favorites]);

  useEffect(() => {
    if (rankings.length > 1) {
      setCurrentPair([rankings[0], rankings[1]]);
      setCurrentComparison([0, 0]);
    } else if (rankings.length === 1) {
      setFinishedRanking(true);
    }
  }, [rankings]);

  const handleChooseMovie = (index) => {
    const [movieA, movieB] = currentPair;
    const [scoreA, scoreB] = currentComparison;
  
    if (index === 0) {
      setRankings((prevRankings) => [
        { ...movieA, score: scoreA + 1 },
        { ...movieB, score: scoreB - 1 },
        ...prevRankings.slice(2),
      ]);
    } else if (index === 1) {
      setRankings((prevRankings) => [
        { ...movieA, score: scoreA - 1 },
        { ...movieB, score: scoreB + 1 },
        ...prevRankings.slice(2),
      ]);
    }
  
    // Move to the next comparison
    setCurrentPair((prevPair) => {
      const remainingMovies = rankings.slice(2);
      if (remainingMovies.length > 1) {
        return [remainingMovies[0], remainingMovies[1]];
      } else if (remainingMovies.length === 1) {
        return [remainingMovies[0], null];
      } else {
        setFinishedRanking(true);
        return [null, null];
      }
    });
  
    setCurrentComparison([0, 0]);
  };
  
  if (finishedRanking) {
    const rankedMovies = rankings
      .sort((a, b) => b.score - a.score)
      .map((movie, index) => (
        <div key={movie.imdbID}>
          <h3>{index + 1}. {movie.Title}</h3>
          <p>Score: {movie.score}</p>
        </div>
      ));

    return (
      <div>
        <h2>Rankings</h2>
        {rankedMovies}
      </div>
    );
  }

  return (
    <div>
      <h2>Pairwise Comparison</h2>
      <h3>Which movie do you prefer?</h3>
      <div>
        <button onClick={() => handleChooseMovie(0)}>{currentPair[0]?.Title}</button>
        <span>or</span>
        <button onClick={() => handleChooseMovie(1)}>{currentPair[1]?.Title}</button>
      </div>
    </div>
  );
};

export default RankPage;