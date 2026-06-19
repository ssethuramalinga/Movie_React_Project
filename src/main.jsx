import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/*Idea: program starts at index.html. The browser first receives an empty <div>root</div>.
Inside that file, there's a script that connects the html to JS. Then, main.jsx runs. 
Inside main.jsx, it has imported App.jsx to use.

In the lines of code below, we use .render to make App.jsx run and return the elements it used.
React inserts those elements into the root div in index.html using getElementById('root').
Once index.html finally gets its UI elements inside root div, now the browser can finally show the webpage.
*/

//only returns what is inside App function in App.jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
