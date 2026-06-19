import './App.css'
import MovieCard from "./component/MovieCard";

/*this is the App component: a component is a function that returns
  JSX (Javascript + HTML) code.
*/
function App() {
  const movieNumber = 1;
  const movieOtherNumber = 2;
  return ( 
    //You must only have one parent element
    <>
      {movieNumber === 1 ?
        (<MovieCard movie={{title: "Shrreya's Movie", release_date: 2025}}/>)
        :
        (<MovieCard movie={{title: "Minions", release_date: 2021}}/>)
      }


      {movieOtherNumber === 2 && <MovieCard movie={{title: "Alice and Wonderland", release_date: 2020}}/>}

      <MovieCard movie={{title: "Yay", release_date: 2017}}/>
    </>

  );
}

export default App
