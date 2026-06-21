const API_KEY = "a336131fa602f9f7de2d3a09a963fb63";
const BASE_URL="https://api.themoviedb.org/3";

/*
    in getPopularMovies(), we are using fetch() to send an API request to server to retrive all popular movies.
    Inside of fetch(), we have to include API_KEY (so that server knows which application is sending API request) and
    BASE_URL (location where database is). We also included the "/movie/popular" endpoint attached to the end of the BASE_URL
    because by adding "/movie/popular" at the end, that specifies exactly which part of the database we are trying to access.

*/

export const getPopularMovies = async() => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async(query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}