import React, { Component } from 'react';
import { connect } from 'react-redux';


class MovieDetails extends Component {
    render() {

        return (
            <p>Movie Details</p>
        )
    }
}

export default connect()(MovieDetails);