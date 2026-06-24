import "../css/Favorites.css"
import {useMovieContext} from "../contexts/MovieContext"
import MovieCard from "../component/MovieCard"

function Favorites() {
    const {favorites} = useMovieContext();

    if (favorites) {
        return (
            <div className = "favorites">
                <h2 className = "title">Your Favorites</h2>
                <div className = "movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie = {movie} key={movie.id}/>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className = "favorite-empty">
            <h2>
                No Favorite Movies Yet
            </h2>
            <p>
                Start adding movies to your favorites and the will appear
            </p>
        </div>
    );
}

export default Favorites