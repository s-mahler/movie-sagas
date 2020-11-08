import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import Movies from '../Movies/Movies'
import AddMovie from '../AddMovie/AddMovie';
import MovieDetails from '../MovieDetails/MovieDetails';
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Movies!</h1>
        <Router>
          {/* This link shows up on every page */}
          {/* It doesn't affect functionality, but I would prefer to remove it from the "add movie" view */}
          <Link className="link" to="/addmovie">Add a movie</Link>

          {/* Routes used throughout the app */}
          <Route exact path="/" component={Movies}/>
          <Route path="/details/:movieId" component={MovieDetails}/>
          <Route path="/addmovie" component={AddMovie}/>
        </Router>
      </div>
    );
  }
}

export default App;
