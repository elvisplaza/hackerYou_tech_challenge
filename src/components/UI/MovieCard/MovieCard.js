// eslint-disable-next-line
import React, { Fragment, useEffect, useContext, useState } from "react";
//Components
import s from "./MovieCard.module.css";
import ActorCard from "./../ActorCard/ActorCard";

//helpers
import { getMovieDetails } from "./../../../helpers/ApiCalls/movies";

//icons
import movieIcon from "./movieRealIcon.svg";

const MovieCard = props => {
  // ================= state=====================
  const [showInfo, setShowInfo] = useState(false);
  const [movie, setMovie] = useState({});
  // ==================== end of state ====================
  // this function will hide and show the information of the movie
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  // this function will call upon the getMovieDetails helper function to gather the required info for the card.
  const getMovieInfo = async () => {
    const { id } = props.movieInfo;
    const movieInfo = await getMovieDetails(id);
    return setMovie(movieInfo);
  };
  // =============== start of useEffect =================
  //as the page loads, it will call upon getMovieInfo funciton
  useEffect(() => {
    getMovieInfo();
  }, []);

  return (
    <section className={s.movie_card}>
      <h2 className={s.movie_card_title}>{movie.original_title}</h2>
      <p>
        {" "}
        <span>Release Date:</span> {movie.release_date}
      </p>
      <p>
        <span>Run time:</span> {movie.runtime} mins
      </p>
      <div className={s.click_me_container} onClick={handleShowInfo}>
        {" "}
        <img src={movieIcon} className={s.movie_icon} alt="a picture of a projector style film, with four holes inside a circle" />
      </div>
      {showInfo && movie !== undefined ? (
        <Fragment>
          <p> <span>Overview:</span> {movie.overview}</p>

          <h3>Genre</h3>
          <ul>
            {movie.genres.map(id => {
              return <div key={id.name}>{id.name}</div>;
            })}
          </ul>
          <h3>Cast</h3>
          <ul>
            {movie.credits.cast.map(actor => {
              return <ActorCard actorInfo={actor} />;
            })}
          </ul>
        </Fragment>
      ) : null}
    </section>
  );
};

export default MovieCard;
