import './css/App.css'
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import {Routes, Route} from "react-router-dom"
import NavBar from "./component/NavBar"

/*this is the App component: a component is a function that returns
  JSX (Javascript + HTML) code.
*/
function App() {

  return ( 
    //You must only have one parent element
    //Each 'Route' specification for each page allows us to access home page when we do: https://localhost/ and favorites page when we do https://localhost/favorites (page routing)
    <div>
      <NavBar/>
      <main className = "main-content">
        <Routes>
          <Route path = "/" element={<Home />}/>
          <Route path = "/favorites" element={<Favorites />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
