import React, { Component } from 'react';
import { connect } from 'react-redux';


class AddMovie extends Component {

    // Local state to send to DB
    // Genre_id used instead of the string of the genre's name
        // It will be used in the relationship table in the DB, movies_genres
    state = {
        newMovie: {
            title: '',
            poster: '',
            description: '',
            genre_id: ''
        }
    }

    // Get genres for the drop down on page load
    componentDidMount = () => {
        this.getGenres();
    }

    getGenres = () => {
        this.props.dispatch({type: 'GET_GENRES'});
    }

    // One handleChange function to track user input into the form fields
    handleChange = (event, eventType) => {
        this.setState({
            newMovie: {
                ...this.state.newMovie,
                [eventType]: event.target.value
            }
        })
    }

    // Send user back to home page if they do not want to add a movie
    cancel = () => {
        this.props.history.push(`/`);
    }

    submitForm = () => {
        // Basic input validation, verging on being too repetetive
        if (this.state.newMovie.title === '' || this.state.newMovie.poster === ''|| this.state.newMovie.description === '' || this.state.newMovie.genre_id === '') {
            alert('Complete all input fields and select a genre');
        } else {
            // If all inputs valid, dispatch the local state to the store and send user to home page
            this.props.dispatch({type: 'ADD_MOVIE', payload: this.state.newMovie});
            this.props.history.push(`/`);
        }
    }

    render() {
        return (
            <div className="movieForm">
                <input onChange={(event) => this.handleChange(event, 'title')} placeholder="Title"/>
                <input onChange={(event) => this.handleChange(event, 'poster')}placeholder="Poster URL"/>
                <textarea onChange={(event) => this.handleChange(event, 'description')} placeholder="Description"/>
                <select onChange={(event) => this.handleChange(event, 'genre_id')}>
                    {/* Having a "blank" option forces the user to select a different genre, triggering the onChange event */}
                    <option value=''>Select a genre</option>
                    {this.props.reduxStore.genres.map((genre) => {
                        return <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                    })}
                </select>
                <button onClick={this.submitForm}>Save</button>
                <button onClick={this.cancel}>Cancel</button>
            </div>
        )
    }
}

const putReduxStoreOnProps = (reduxStore) => ({
    reduxStore
})

export default connect(putReduxStoreOnProps)(AddMovie);