import React, { Component } from 'react';
import { connect } from 'react-redux';

class Movies extends Component {
    
    // Trigger functions on page load
    componentDidMount = () => {
        this.getMovies();
    }

    // Get movies from DB
    getMovies = () => {
        this.props.dispatch({type: 'GET_MOVIES'});
    }

    // Route user to specific movie, sending the movieId parameter
    goToDetails = (movieId) => {
        this.props.history.push(`/details/${movieId}`);
    }
    
    render() {
        return (
            <ol>
                {this.props.reduxStore.movies.map((movie) => {
                    return <li className="movieCard" key={movie.id}>
                                <img onClick={() => this.goToDetails(movie.id)} alt={movie.description} src={movie.poster}/> 
                                <div className="movieText">
                                    <h4>{movie.title}</h4> 
                                    <p>{movie.description}</p>
                                </div>
                            </li>
                })}
            </ol>
        )
    }
}

const putReduxStoreOnProps = (reduxStore) => ({
    reduxStore
})

export default connect(putReduxStoreOnProps)(Movies);