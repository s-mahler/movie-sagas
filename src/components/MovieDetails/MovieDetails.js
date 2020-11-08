import React, { Component } from 'react';
import { connect } from 'react-redux';


class MovieDetails extends Component {
    
    componentDidMount = () => {
        console.log(this.props.match.params);
    }

    getGenres = () => {
        this.props.dispatch({type: 'GET_GENRES', payload: this.props.match.params.movieId});
    } 
    
    render() {
        return (
            <p>Movie Details</p>
        )
    }
}

export default connect()(MovieDetails);