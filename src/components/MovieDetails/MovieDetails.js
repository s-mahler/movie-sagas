import React, { Component } from 'react';
import { connect } from 'react-redux';


class MovieDetails extends Component {
    
    // Trigger functions on page load
    componentDidMount = () => {
        this.getSpecificMovie();
        this.getGenres();
    }

    // Get movie and its genres
    // Payload is the router parameter (specific movie ID)
    getGenres = () => {
        this.props.dispatch({type: 'GET_SPECIFIC_GENRES', payload: this.props.match.params.movieId});
    }

    getSpecificMovie = () => {
        this.props.dispatch({type: 'GET_SPECIFIC_MOVIE', payload: this.props.match.params.movieId});
    }

    // Send user back to home page
    goBack = () => {
        this.props.history.push(`/`);
    }
    
    render() {
        return (
            <>
                {this.props.reduxStore.movies.map((movie) => {
                    return <div className="movieDetails" key={movie.id}>

                                <img className="moviePoster" alt={movie.description} src={movie.poster}/> 

                                <div className="movieGenres">
                                    <h4>Genres</h4>

                                    {this.props.reduxStore.genres.map((genre, index) => {
                                        return <div key={index}>
                                                    <p>{genre.name}</p>
                                                </div>
                                    })}
                                </div>

                                <div className="movieDescription">
                                    <h4>{movie.title}</h4> 
                                    <p>{movie.description}</p>
                                </div>

                            </div>
                })}

            <button onClick={this.goBack}>Go Back</button>
            </>
        )
    }
}

const putReduxStoreOnProps = (reduxStore) => ({
    reduxStore
})

export default connect(putReduxStoreOnProps)(MovieDetails);