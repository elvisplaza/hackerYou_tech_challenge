import axios from "axios";
import { apiKey } from "./../apiKeys";

const url = "https://api.themoviedb.org/3";

// this function will make an api call and retrieve first set of movies based of the the page number you provide it. 
export const movieApiCall = pageNumber => {
  return axios({
    method: "GET",
    url: `${url}/movie/upcoming`,
    dataResponse: "json",
    params: {
      api_key: `${apiKey}`,
      page: pageNumber
    }
  })
    .then(res => {
      if (res.statusText === "OK") {
        return res.data;
      }
    })
    .catch(err => {
      return console.log(err);
    });
};

//this function will continue to call the movieApiCall function until it has called all it's results. 
export const getAllMovies = async () => {
  let page = 1;
  let results = [];
  let totalResults = await movieApiCall(1);
  while (results.length < totalResults.total_results) {
    let apiCall = await movieApiCall(page);
    page = page + 1;
    results = [...results, ...apiCall.results];
  }
  return results;
};


//this function will use the movie id to gather more information about the movie selected. 
export const getMovieDetails = movieId => {
  return axios({
    method: "GET",
    url: `${url}/movie/${movieId}`,
    dataResponse: "json",
    params: {
      api_key: `${apiKey}`,
      append_to_response: "credits",
    }
  })
    .then(res => {
      if (res.statusText === "OK") {
        return res.data;
      }
    })
    .catch(err => {
      return console.log(err);
    });
};

//this function will take in the actor id and will retrieve every movie credits the selected actor has acted in. 
export const getActorMovieCredits = actorId => {
  return axios({
    method: "GET",
    url: `${url}/person/${actorId}/movie_credits`,
    dataResponse: "json",
    params: {
      api_key: `${apiKey}`,
     
    }
  })
    .then(res => {
      if (res.statusText === "OK") {
        return res.data;
      }
    })
    .catch(err => {
      return console.log(err);
    });
};
