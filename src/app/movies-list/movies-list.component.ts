import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from '../models/Movie';
import { Observable } from 'rxjs';
import { MovieService } from '../service/movie.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalControllerComponent } from 'src/app/modals/modal-controller/modal-controller.component';
import * as MovieActions from '../store/actions';
import * as AppState from '../store/reducers';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  allMovies: Observable<{ movies: Movie[] }>;
  modal: MatDialogRef<ModalControllerComponent>;
  term: string;
  movieNotFound: boolean;

  constructor(private store: Store<AppState.State>,
    private movieService: MovieService,
    private modalController: MatDialog) {

    this.allMovies = this.movieService.allMovies;
  }

  ngOnInit() {
    // this.movieService.loadMovies();
    this.store.dispatch(new MovieActions.GetExternalMovies);
  }

  openModal() {
    this.modal = this.modalController.open(ModalControllerComponent);
    this.modal.afterClosed().subscribe((data) => {
      if (data) {
        this.movieService.getOneMovieByTitle(data.Title).subscribe((response) => {
          data.Poster = response.Poster;
          this.store.dispatch(new MovieActions.AddMovie(data));
        });
      }
    });
  }

  searchMovie() {
    let result = this.movieService.searchMovie(this.term);
    if (result) {
      this.store.dispatch(new MovieActions.SearchedMovie(result));
      this.movieNotFound = false;
    } else {
      this.movieNotFound = true;
    }
    this.term = "";
  }



}
