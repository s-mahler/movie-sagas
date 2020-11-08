import React, { Component } from 'react';
import { connect } from 'react-redux';


class Movies extends Component {
    
    componentDidMount = () => {
        this.getMovies();
    }

    getMovies = () => {
        this.props.dispatch({type: 'GET_MOVIES'});
    }
    
    render() {
        return (
            <ul>
                {this.props.reduxStore.movies.map((movie) => {
                    return <li key={movie.id}><img alt={movie.description} src={movie.poster}/> {movie.title} | {movie.description}</li>
                })}
            </ul>
        )
    }
}

const putReduxStoreOnProps = (reduxStore) => ({
    reduxStore
})

export default connect(putReduxStoreOnProps)(Movies);