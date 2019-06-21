import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './store/reducers';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { TitlePipe } from './pipe/title.pipe';
import { ModalControllerComponent } from './modals/modal-controller/modal-controller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './store/effects';
@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    SingleMovieComponent,
    TitlePipe,
    ModalControllerComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ moviesList: movieReducer }),
    HttpClientModule, BrowserAnimationsModule,
    MatButtonModule, MatDialogModule,
    MatInputModule, ReactiveFormsModule,
    FormsModule,
    EffectsModule.forRoot([MoviesEffects])

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalControllerComponent]
})
export class AppModule { }
