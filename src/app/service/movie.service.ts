import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';
import { Store } from '@ngrx/store';
import * as AppState from '../store/reducers';
import { environment } from 'src/environments/environment.prod';

interface externalMovies {
  Search: { Title: string }[]
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  allMovies: Observable<{ movies: Movie[] }>;
  foundMovie: Movie;

  constructor(private http: HttpClient,
    private store: Store<AppState.State>
  ) {

    this.allMovies = this.store.select('moviesList');
  }
  getMoviesFromAPI(): Observable<externalMovies> {
    return <Observable<externalMovies>>this.http.get(`${environment.moviesUrl}${environment.apiKey}`);
  }

  getOneMovieByTitle(title): Observable<Movie> {
    return <Observable<Movie>>this.http.get(`${environment.titleUrl}${title}${environment.apiKey}`)
  }

  fixTitle(str: string) {
    return str = str.toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(" ");
  }


  searchMovie(term) {
    let searchTerm = this.fixTitle(term);
    this.allMovies.subscribe((data) => {
      let result = data.movies.find(movie => movie.Title == searchTerm);
      if (result) this.foundMovie = result;
    });
    return this.foundMovie;
  }
}
