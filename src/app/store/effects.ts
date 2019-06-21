import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, reduce, flatMap } from 'rxjs/operators';
import * as MovieActions from './actions';
import * as AppState from './reducers';
import { MovieService } from '../service/movie.service';
import { Store } from '@ngrx/store';
@Injectable()

export class MoviesEffects {
    constructor(
        private actions$: Actions,
        private MovieService: MovieService,
        private store: Store<AppState.State>
    ) { }

    @Effect() moviesEffect = this.actions$
        .ofType(MovieActions.GET_EXTERNAL_MOVIES)
        .pipe(
            switchMap(() => this.MovieService.getMoviesFromAPI()),
            switchMap(externalMovies => externalMovies.Search.map(movie => movie.Title)),
            flatMap(singleMovieTitle => this.MovieService.getOneMovieByTitle(singleMovieTitle)),
            reduce((array, movie) => {
                array.push(movie);
                if (array.length == 10) {
                    this.store.dispatch(new MovieActions.LoadMovies(array));
                }
                return array;
            }, [])
        )
}





