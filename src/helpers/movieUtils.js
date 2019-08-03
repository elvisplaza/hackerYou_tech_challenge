export const sortMovies = (array) => {
  const sortedByDate = array.sort((a, b) => {
    const unixTimeForA = new Date(a.release_date).getTime();
    const unixTimeForB = new Date(b.release_date).getTime();
    return unixTimeForA - unixTimeForB;
  })
  return sortedByDate
};


export const filterOutLowerThan10 = (array) =>{
  const popularFilms = []
  array.forEach(movie =>{
    if(movie.popularity > 10 && movie.release_date.includes("2019")){
     return popularFilms.push(movie);
    }
   return;
  })
  
  return popularFilms
}

