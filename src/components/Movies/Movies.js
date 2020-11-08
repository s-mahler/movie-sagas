import React, { Component } from 'react';
import { connect } from 'react-redux';


class Movies extends Component {
    render() {
        return (
            <p>Movie list</p>
        )
    }
}

export default connect()(Movies);