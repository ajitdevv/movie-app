import "./movie.css";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [sortedBy, setSortedBy] = useState("popularity.desc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      let allMovies = [];
      const defaultSearch = "new";
      for (let page = 1; page <= 3; page++) {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=4fb1613a&s=${defaultSearch}&page=${page}`
        );
        if (response.data.Search) {
          allMovies = allMovies.concat(response.data.Search);
        }
      }
      setMovies(allMovies);
    };
    fetchDefaultMovies();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchSubmit = async () => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=4fb1613a&s=${searchQuery}`
    );
    console.log("API response received:", response.data);
    setMovies(response.data.Search);
  };
  const handleSortChange = (event) => {
    setSortedBy(event.target.value);
  };
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };
  return (
    <div className="container">
      <h1>Movie Night</h1>
      <div className="input-search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
          value={searchQuery}
          className="search-field"
        />
        <button onClick={handleSearchSubmit} className="search-button">
          <CiSearch />
        </button>
      </div>
      <div className="sort">
        <select
          id="sort-select"
          className="sort-select"
          value={sortedBy}
          onChange={handleSortChange}
        >
          <option value="popularity.desc">Popularity descending</option>
          <option value="popularity.asc">Popularity ascending</option>
          <option value="release_date.desc">Release Date descending</option>
          <option value="release_date.asc">Release Date ascending</option>
          <option value="vote_average.desc">Rating descending</option>
          <option value="vote_average.asc">Rating ascending</option>
        </select>
        <label className="sort-label" htmlFor="sort-select">
          Sort by:
        </label>
      </div>
      <div className="movie_wareper">
        {movies?.map((movie) => (
          <div key={movie.imdbID} className="movie_card">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
            />
            <h2>{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
