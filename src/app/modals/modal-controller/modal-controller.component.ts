import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/service/movie.service';
@Component({
  selector: 'app-modal-controller',
  templateUrl: './modal-controller.component.html',
  styleUrls: ['./modal-controller.component.css']
})
export class ModalControllerComponent implements OnInit {
  formData: FormGroup;
  addOrEdit: string = "Add";
  deleteModal: boolean;
  allMovies: Movie[] = [];

  constructor(private dialog: MatDialogRef<ModalControllerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: MovieService
  ) {

    this.movieService.allMovies.subscribe((data) => {
      this.allMovies = data.movies;
    });

    this.formData = new FormGroup({
      Title: new FormControl('', [Validators.required, this.checkTitle.bind(this)]),
      Year: new FormControl('', [Validators.required, this.checkYear.bind(this)]),
      Runtime: new FormControl('', Validators.required),
      Genre: new FormControl('', Validators.required),
      Director: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    if (this.data) {
      if (this.data !== "delete") {
        this.addOrEdit = "Edit";
        this.formData = new FormGroup({
          imdbID: new FormControl(this.data.imdbID),
          Title: new FormControl(this.data.Title, [Validators.required, this.checkTitle.bind(this)]),
          Year: new FormControl(this.data.Year, [Validators.required, this.checkYear.bind(this)]),
          Runtime: new FormControl(this.data.Runtime, Validators.required),
          Genre: new FormControl(this.data.Genre, Validators.required),
          Director: new FormControl(this.data.Director, Validators.required)
        });
      } else {
        this.deleteModal = true;
      }
    }
  }


  checkTitle(control: AbstractControl): { [key: string]: boolean } | null {
    if (control && control.value !== "" && control.touched) {
      let movieTitle = this.movieService.fixTitle(control.value);
      let isExist = this.allMovies.filter(movie => movie.Title == movieTitle);
      if (isExist.length !== 0) {
        return { "titleExists": true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  checkYear(control: AbstractControl): { [key: string]: boolean } | null {
    if (control && control.value !== "") {
      const regex = /[^0-9]/g;
      if (control.value > 1900 && control.value <= 2018 && regex.test(control.value) == false) {
        return null;
      } else {
        return { "yearInvalid": true };
      }
    }
  }

  addMovie() {
    this.dialog.close(this.formData.value);
  }
  delete() {
    this.dialog.close("delete");
  }
  closeModal() {
    this.dialog.close();
  }


}
