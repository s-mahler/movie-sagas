import React, { Component } from 'react';
import { connect } from 'react-redux';

class Movies extends Component {
    
    componentDidMount = () => {
        this.getMovies();
    }

    getMovies = () => {
        this.props.dispatch({type: 'GET_MOVIES'});
    }

    goToDetails = (movieId) => {
        this.props.history.push(`/details/${movieId}`);
    }
    
    render() {
        return (
            <ol>
                {this.props.reduxStore.movies.map((movie) => {
                    return <li key={movie.id}>
                                <h4>{movie.title}</h4> 
                                <img onClick={() => this.goToDetails(movie.id)} alt={movie.description} src={movie.poster}/> 
                                <p>{movie.description}</p>
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