import {createContext, useState, useContext, useEffect} from "react"

//createContext() creates a container that will later hold shared data
const MovieContext = createContext()

//opens container and reads contents (use this in other files to immedately access all functions and variables)
export const useMovieContext = () => useContext(MovieContext)

//MovieProvider is wrapped around App, so ANY component under App can access the variable and functions in this
//index.html -> main -> MovieProvider -> App -> Home, NavBar, Favorites -> MovieCard
export const MovieProvider = ({children}) => {

    /*
        Initially, after refreshing the page, I noticed that favorite movies were not saved between refreshes.
        Probably because second useEffect() was running before first useEffect().
        Solution: immedately get the array from localStorage inside of useState
    */
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    })

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    /*
        This code below wraps MovieContext.Provider wraps around App (children).
        Here, MovieContext now finally contains all of the shared data (variable and functions) inside value array.
    */
    return <MovieContext.Provider value = {value}>
        {children}
    </MovieContext.Provider>
}
