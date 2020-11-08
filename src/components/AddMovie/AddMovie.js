import React, { Component } from 'react';
import { connect } from 'react-redux';


class AddMovie extends Component {

    componentDidMount = () => {
        this.getGenres();
    }

    getGenres = () => {
        this.props.dispatch({type: 'GET_GENRES'});
    }

    cancel = () => {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <div>
                <input placeholder="Title"/>
                <input placeholder="Poster URL"/>
                <textarea placeholder="Description"/>
                <label>Select a genre</label>
                <select>
                    {this.props.reduxStore.genres.map((genre) => {
                        return <option key={genre.id}>
                                    {genre.name}
                                </option>
                    })}
                </select>
                <button>Save</button>
                <button onClick={this.cancel}>Cancel</button>
            </div>
        )
    }
}

const putReduxStoreOnProps = (reduxStore) => ({
    reduxStore
})

export default connect(putReduxStoreOnProps)(AddMovie);