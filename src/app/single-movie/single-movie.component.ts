import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/Movie';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalControllerComponent } from '../modals/modal-controller/modal-controller.component';
import * as MovieActions from '../store/actions';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit {
  @Input() singleMovie: Movie;
  editModal: MatDialogRef<ModalControllerComponent>;
  deleteModal: MatDialogRef<ModalControllerComponent>;
  constructor(private modalController: MatDialog,
    private store: Store<{ moviesList: { movies: Movie[] } }>,
    private movieService: MovieService) { }

  ngOnInit() {
  }


  editMovie() {
    this.editModal = this.modalController.open(ModalControllerComponent, {
      data: this.singleMovie
    });
    this.editModal.afterClosed().subscribe((data) => {
      if (data) {
        this.movieService.getOneMovieByTitle(data.Title).subscribe((response) => {
          data.Poster = response.Poster;
          this.store.dispatch(new MovieActions.EditMovie(data));
        });
      }
    });
  }

  deleteMovie() {
    this.deleteModal = this.modalController.open(ModalControllerComponent, {
      data: "delete"
    });
    this.deleteModal.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(new MovieActions.DeleteMovie(this.singleMovie));
      }
    });
  }

}
