import React, { Component } from 'react';
import { connect } from 'react-redux';


class MovieDetails extends Component {
    
    componentDidMount = () => {
        this.getSpecificMovie();
    }

    getGenres = () => {
        this.props.dispatch({type: 'GET_GENRES', payload: this.props.match.params.movieId});
    }

    getSpecificMovie = () => {
        this.props.dispatch({type: 'GET_SPECIFIC_MOVIE', payload: this.props.match.params.movieId});
    }
    
    render() {
        return (
            <>
                {this.props.reduxStore.movies.map((movie) => {
                    return <div key={movie.id}>
                                <img onClick={() => this.goToDetails(movie.id)} alt={movie.description} src={movie.poster}/> 
                                <h4>{movie.title}</h4> 
                                {movie.description}
                            </div>
                })}
                <button>Go Back</button>
            </>
        )
    }
}

const putReduxStoreOnProps = (reduxStore) => ({
    reduxStore
})

export default connect(putReduxStoreOnProps)(MovieDetails);