import './App.css'
import Home from "./pages/Home"

/*this is the App component: a component is a function that returns
  JSX (Javascript + HTML) code.
*/
function App() {

  return ( 
    //You must only have one parent element
    <>
      <Home />
    </>
  );
}

export default App;
