import MovieCard from "../component/MovieCard";
import {useState} from "react"

function Home() {
    //searchQuery stores what user typed in input search bar (what React remembers)
    //setSearchQuery is function that changes what React remembers

    const [searchQuery, setSearchQuery] = useState("")


    const movies = [
        {title: "Harry Potter", release_date:"2022", id : 1},
        {title: "Minions", release_date:"2025", id:2},
        {title:"Yay", release_date:"2022", id:3},
        {title: "wahoo", release_date:"2021", id:4}
    ]

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
                    className = "seach-button"
                > Search </button>
            </form>
            <div className="movie-grid">
                {movies.map((movie) => 
                movie.title.toLowerCase().startsWith(searchQuery) && 
                 <MovieCard movie={movie} key={movie.id}/>)}
            </div>
        </div>

        //in code above (movie.title.toLowerCase()...), if any movie title in database matches what was in searchQuery typed by user, then only display that specific movie card
    );
}

export default Home