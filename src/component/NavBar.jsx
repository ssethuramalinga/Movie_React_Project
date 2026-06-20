import {Link} from "react-router-dom"
import "../css/Navbar.css"

/*
  We use the Link element: when user clicks on a certain name (Home, Favorites, etc.),
  then the Link element allows programmer to decide which page (URL) I should direct the user to.
  I have already definitions to each path in App.jsx in <Routes></Routes>
  For example, if user clicks on "Favorites", then it will direct them to Favorites page (http://localhost/favorites)
*/

function NavBar() {
    return (
        <nav className = "navbar">
            <div className = "navbar-brand">
                <Link to ="/">Movie App</Link>
            </div>
            <div className = "navbar-links">
                <Link to = "/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar