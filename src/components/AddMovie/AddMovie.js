import React, { Component } from 'react';
import { connect } from 'react-redux';


class AddMovie extends Component {

    state = {
        newMovie: {
            title: '',
            poster: '',
            description: '',
            genre_id: ''
        }
    }

    componentDidMount = () => {
        this.getGenres();
    }

    getGenres = () => {
        this.props.dispatch({type: 'GET_GENRES'});
    }

    handleChange = (event, eventType) => {
        this.setState({
            newMovie: {
                ...this.state.newMovie,
                [eventType]: event.target.value
            }
        })
    }

    cancel = () => {
        this.props.history.push(`/`);
    }

    submitForm = () => {
        // Basic input validation, verging on being too repetetive
        if (this.state.newMovie.title === '' || this.state.newMovie.poster === ''|| this.state.newMovie.description === '' || this.state.newMovie.genre_id === '') {
            alert('Complete all input fields and select a genre');
        } else {
            console.log(this.state.newMovie)
            this.props.dispatch({type: 'ADD_MOVIE', payload: this.state.newMovie});
            // After adding in the push back to the home page, server and client side 404s started to return in a GET route
            // Everything still functions as before, and I have no clue where they are coming from
            this.props.history.push(`/`);
        }
    }

    render() {
        return (
            <div>
                <input onChange={(event) => this.handleChange(event, 'title')} placeholder="Title"/>
                <input onChange={(event) => this.handleChange(event, 'poster')}placeholder="Poster URL"/>
                <textarea onChange={(event) => this.handleChange(event, 'description')} placeholder="Description"/>
                <select onChange={(event) => this.handleChange(event, 'genre_id')}>
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