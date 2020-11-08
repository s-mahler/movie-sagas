import React, { Component } from 'react';
import { connect } from 'react-redux';


class AddMovie extends Component {
    render() {

        return (
            <p>ADD MOVIE</p>
        )
    }
}

export default connect()(AddMovie);