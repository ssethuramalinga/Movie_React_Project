import MovieCard from "../component/MovieCard";
import "../css/Home.css"
import {useState, useEffect} from "react"

function Home() {
    //searchQuery stores what user typed in input search bar (what React remembers)
    //setSearchQuery is function that changes what React remembers
    //UseState remembers searchQuery AND movies between renders

    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        {title: "Harry Potter", release_date:"2022", id : 1},
        {title: "Minions", release_date:"2025", id:2},
        {title:"Yay", release_date:"2022", id:3},
        {title: "wahoo", release_date:"2021", id:4}
    ]
    

    /* 
      UseEffect - React runs certain code at specific times instead of every render
      If any of the values inside of the [] changes, then getPopularMovies() runs.
      If no value changes inside of [], getPopularMovies() never runs again regardless of how many times state changes and code runs again.
      That's because getPopularMovies() sends API request to get all popular movies, so we don't want
      to be sending millions of APi requests when we already have all popular movies if we run the code once
    */
    useEffect(() => {}, [])


    const handleSearch = (e) => {
        //clicking onSubmit() in form automatically refreshes page and so text in input box disappears, so if we don't want that then do this below:
        e.preventDefault()

        alert(searchQuery);

        //after alert pops up, we make ---- be inside the input box since we made searchQuery now contain "-----"
        setSearchQuery("-----");
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
            <div className="movie-grid">
                {movies.map((movie) => 
                 <MovieCard movie={movie} key={movie.id}/>)}
            </div>
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