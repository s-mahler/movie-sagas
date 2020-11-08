import React, { Component } from 'react';
import { connect } from 'react-redux';


class MovieDetails extends Component {
    
    componentDidMount = () => {
        this.getSpecificMovie();
        this.getGenres();
    }

    getGenres = () => {
        this.props.dispatch({type: 'GET_GENRES', payload: this.props.match.params.movieId});
    }

    getSpecificMovie = () => {
        this.props.dispatch({type: 'GET_SPECIFIC_MOVIE', payload: this.props.match.params.movieId});
    }

    goBack = () => {
        this.props.history.push(`/`);
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

                <h4>Genres</h4>
                
                {this.props.reduxStore.genres.map((genre, index) => {
                    return <div key={index}>
                                <p>{genre.name}</p>
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