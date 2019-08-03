// eslint-disable-next-line
import React, { Fragment, useEffect, useContext, useState } from "react";
import s from "./Home.module.css";
//Components
import MovieCard from "./../../UI/MovieCard/MovieCard";
//helpers
import { getAllMovies } from "./../../../helpers/ApiCalls/movies";
import { sortMovies, filterOutLowerThan10 } from "./../../../helpers/movieUtils";

const Home = props => {
  // =================== state ========================
  const [movieList, setMovieList] = useState([]);
  //=========================== end of state ================

  //This function will be called to gather the list of upcoming movies.
  const moviesList = async () => {
    const movieList = await getAllMovies();
    const popularFilms = await filterOutLowerThan10(movieList);
    const sortedMovieList = sortMovies(popularFilms);
    console.log(sortedMovieList);
    return setMovieList(sortedMovieList);
  };

  // ====================== useEffect ======================>
  useEffect(() => {
    moviesList();
  }, []);

  return (
    <section className={s.home}>
      <div className={s.left_bar}>
        <div className={s.banner_bar}>
          <h1>TIFF</h1>
          <h2 className={s.headings}>Upcoming Movies for 2019.</h2>
        </div>

    
      </div>
      {/*  movie list mapping portion, will also provide a checker*/}
      <div className={s.movie_cards_container}>
        {movieList !== undefined || movieList !== []
          ? movieList.map(movie => {
              return <MovieCard movieInfo={movie} key={movie.id} />;
            })
          : "movie is loading"}
      </div>
    </section>
  );
};

export default Home;
