import MovieCard from "../component/MovieCard";
import "../css/Home.css"
import {useState, useEffect} from "react"
import {searchMovies, getPopularMovies} from "../services/api"

function Home() {
    //searchQuery stores what user typed in input search bar (what React remembers)
    //setSearchQuery is function that changes what React remembers
    //UseState remembers searchQuery AND movies between renders

    /*
        These variarblaes searchQuery = "", movies = [], error = null, loading = true
        will be stored in React's memory. We use the setFunction("something") to make the
        variable stored in React's memory equal to "something" now.
    */
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    /* 
      UseEffect - React runs certain code at specific times instead of every render
      If any of the values inside of the [] changes, then getPopularMovies() runs.
      If no value changes inside of [], getPopularMovies() never runs again regardless of how many times state changes and code runs again.
      That's because getPopularMovies() sends API request to get all popular movies, so we don't want
      to be sending millions of APi requests when we already have all popular movies if we run the code once.

      UseEffect, in this case, only runs ONCE because of empty array []. useEffect gets skipped and only runs after all the rest of code runs.
    */
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        }
        loadPopularMovies();
    }, [])

    /*
        In handleSearch runs only if user submits the input box search form.
        This code checks if searchQuery is null, checks if there is another api running
        (in that case we don't want 2 api calls at the same time).
        Then, searchMovies() is called on and returns all movie objects in an array starting with the title that is in searchQuery.
    */

    const handleSearch = async (e) => {
        //clicking onSubmit() in form automatically refreshes page and so text in input box disappears, so if we don't want that then do this below:
        e.preventDefault()

        //if searchquery is empty string, then leave function
        if (!searchQuery.trim()) {
            return
        }

        //we dont want two api calls to run at once so we leave handleSearch if useEffect is still running and waiting on popular movies
        if (loading) {
            return
        }
        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch(err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false);
        }
    }



    return(
        <div className="Home">
            <form onSubmit={handleSearch} className = "search-form">
                <input 
                    placeholder="Search for movies..."
                    type = "text"
                    className = "search-input"

                    //input box should display what's stored in searchQuery
                    //without onChange ()... line, whatever user types will not be updates in searchQuery and thus will not show in inputbox as value
                    value = {searchQuery}

                    /*for every keystoke user types in input box, onChange automatically starts...
                      setSearchQuery runs, updates searchQuery in memory. If I type "h", -> searchQuery stores "h",
                      If I type "he", searchQuery stores "he", and so on...
                    */
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    type = "submit"
                    className = "search-button"
                > Search </button>
            </form>

            {error && <div className = "error-message">{error}</div>}

            {loading ? (
            <div className = "loading">Loading...</div> 
            ) : ( 
                        <div className="movie-grid">
                            {movies.map((movie) => 
                            <MovieCard movie={movie} key={movie.id}/>)}
                        </div>
            )}

        </div>
        /*
          for every single letter the user types in input box, react automatically updates what is stored in searchQuery.
          searchQuery may have initially had h then he then hel then hell then hello.
          Every SINGLE time there is a change in state, the entire home function runs again.
          So then inside of movies.map()..., React traverses through every single movie object in the database,
          checks if that movie object's title starts with startQuery (what user typed so far), and if so,
          then that specific MovieCard is displayed. And so on...Before the next change in state (next letter typed),
          the UI will be updated for 'h' alone.
        */ 
        //in code above (movie.title.toLowerCase()...), if any movie title in database matches what was in searchQuery typed by user, then only display that specific movie card

        //IMPORTANT: for every single change in state, the whole function is ran again and webpage UI is updated, EVEN before user types in next letter
    );
}

export default Home