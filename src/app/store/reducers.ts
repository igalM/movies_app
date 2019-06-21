import * as MovieActions from './actions';
import { Movie } from '../models/Movie';

export interface State {
    movies: Movie[]
}

const initialState: State = {
    movies: []
}

export function movieReducer(state = initialState, action: MovieActions.MovieActions) {
    const movieIndex = state.movies.findIndex(movie => movie.imdbID == action.payload.imdbID);
    switch (action.type) {
        case MovieActions.ADD_MOVIE:
            action.payload.imdbID = (state.movies.length + 1).toString();
            return {
                ...state,
                movies: [...state.movies, action.payload]
            };
        case MovieActions.LOAD_MOVIES:
            return {
                ...state,
                movies: [...action.payload]
            };
        case MovieActions.EDIT_MOVIE:
            state.movies.splice(movieIndex, 1, action.payload);
            const movie = state.movies[movieIndex];
            const updatedMovie = {
                ...movie,
                ...action.payload
            };
            const movies = [...state.movies];
            movies[movieIndex] = updatedMovie;
            return {
                ...state,
                movies: movies
            }
        case MovieActions.DELETE_MOVIE:
            const oldMovies = [...state.movies];
            oldMovies.splice(movieIndex, 1);
            return {
                ...state,
                movies: oldMovies
            };
        case MovieActions.SHOW_SEARCHED_MOVIE:
            return {
                ...state,
                movies: [action.payload]
            };
        default:
            return state;
    }
}