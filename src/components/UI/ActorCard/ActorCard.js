import React, { Fragment, useEffect, useContext, useState } from "react";

//Components
import s from "./ActorCard.module.css";

//helpers
import { getActorMovieCredits } from "./../../../helpers/ApiCalls/movies";

//icon
import movieIcon from "./../../UI/MovieCard/movieRealIcon.svg";

const ActorCard = props => {
  // ============= start of state ====================
  const [showInfo, setShowInfo] = useState(false);
  const [actorMovieList, setActorMovieList] = useState([]);
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  // =========================== end of state ========================

  // this function will gather the list of movies and set it to the actorMovieList state.
  const getAllMoviesFromActor = async () => {
    const { id } = props.actorInfo;
    const movieListData = await getActorMovieCredits(id);
    const movieList = await movieListData.cast.map(movie => movie.title);
    return setActorMovieList(movieList);
  };

  // ============= start of useEffect =====================
  useEffect(() => {
    getAllMoviesFromActor();
  }, []);
  return (
    <section className={s.actor_card}>
      <div className={s.actor}>
        <p>{props.actorInfo.name}</p>
        <p className={s.movie_icon_span} onClick={handleShowInfo}>
          {" "}
          <img src={movieIcon} className={s.movie_icon} alt="a picture of a projector style film, with four holes inside a circle" />
        </p>
      </div>
      <ul className={s.movie_list_container}>
        {showInfo && actorMovieList !== [] ? (
          <Fragment>
            <p>Other Films</p>
            {actorMovieList.map(movieName => {
              return (
                <li className={s.movie_name} key={movieName}>
                  {" "}
                  {movieName}
                </li>
              );
            })}
          </Fragment>
        ) : null}
      </ul>
    </section>
  );
};

export default ActorCard;
