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


  // =========================== end of state ========================
  
  const handleShowInfo = () => {
    handleDisplayList();
    return setShowInfo(!showInfo);

  };
  const handleDisplayList =()=>{
     return getAllMoviesFromActor()
  }
  // this function will gather the list of movies and set it to the actorMovieList state.
  const getAllMoviesFromActor = async () => {
    const { id } = props.actorInfo;
    const movieListData = await getActorMovieCredits(id);
    const movieList =  movieListData.cast.map(movie => {
      return movie.title
    });
    // console.log(movieListData, "inside actor Card");
    return setActorMovieList(movieList);
  };


  return (
    <section className={s.actor_card}>
      <div className={s.actor}>
        <p>{props.actorInfo.name}</p>
        <p className={s.movie_icon_span} onClick={(handleShowInfo)}>
          {" "}
          <img src={movieIcon} className={s.movie_icon} alt="a picture of a projector style film, with four holes inside a circle" />
        </p>
      </div>
      <ul className={s.movie_list_container}>
        <p>Other Films</p>
        {showInfo && (
        <Fragment>
            {actorMovieList.map(movieName => {
              return (
                <li className={s.movie_name} key={movieName}>
                  {" "}
                  {movieName}
                </li>
              );
            })}
          </Fragment>)}
      </ul>
    </section>
  );
};

export default ActorCard;
