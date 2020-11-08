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
                    return <li className="movieCard" key={movie.id}>
                                <img className="poster" onClick={() => this.goToDetails(movie.id)} alt={movie.description} src={movie.poster}/> 
                                <div className="movieText">
                                    <h4 className="title">{movie.title}</h4> 
                                    <p className="description">{movie.description}</p>
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