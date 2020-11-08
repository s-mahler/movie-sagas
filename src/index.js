import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovies);
    yield takeEvery('GET_GENRES', getGenres);
    yield takeEvery('GET_SPECIFIC_MOVIE', getSpecificMovie);
}

function* getMovies() {
    const moviesResponse = yield Axios.get(`/api/movie`);
    yield put({type: 'SET_MOVIES', payload: moviesResponse.data});
}

function* getGenres(action) {
    try {
        const genresResponse = yield Axios.get(`/api/genre/${action.payload}`);
        yield put({type: 'SET_GENRES', payload: genresResponse.data});
    } catch (error) {
        console.log(error);
    }
}

function* getSpecificMovie(action) {
    try {
        const specificMovieResponse = yield Axios.get(`/api/movie/${action.payload}`);
        yield put({type: 'SET_MOVIES', payload: specificMovieResponse.data});
    } catch (error) {
        console.log(error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
