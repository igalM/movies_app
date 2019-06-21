import { Action } from '@ngrx/store';
import { Movie } from '../models/Movie';

export const ADD_MOVIE = 'ADD_MOVIE';
export const EDIT_MOVIE = 'EDIT_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const LOAD_MOVIES = 'LOAD_MOVIES';
export const SHOW_SEARCHED_MOVIE = 'SHOW_SEARCHED_MOVIE';
export const GET_EXTERNAL_MOVIES = 'GET_EXTERNAL_MOVIES';

export class AddMovie implements Action {
    readonly type = ADD_MOVIE;
    constructor(public payload: Movie) { }
}

export class LoadMovies implements Action {
    readonly type = LOAD_MOVIES;
    constructor(public payload: any) { }
}

export class GetExternalMovies implements Action {
    readonly type = GET_EXTERNAL_MOVIES;
}

export class EditMovie implements Action {
    readonly type = EDIT_MOVIE;
    constructor(public payload: Movie) { }
}

export class DeleteMovie implements Action {
    readonly type = DELETE_MOVIE;
    constructor(public payload: Movie) { }
}

export class SearchedMovie implements Action {
    readonly type = SHOW_SEARCHED_MOVIE;
    constructor(public payload: Movie) { }
}

export type MovieActions = AddMovie | LoadMovies | EditMovie | DeleteMovie | SearchedMovie;