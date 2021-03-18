import '../styles/App.css';
import Navigation from "./Navigation";
import {BrowserRouter as Router} from 'react-router-dom';
import Page from "./Page";
import {useGlobalContext} from "../AppContext";

function App() {

  return (
      <Router basename={process.env.PUBLIC_URL}>
          <div className='App'>
              <Navigation/>
              <Page/>
          </div>
      </Router>
  );
}

export default App;
