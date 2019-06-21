import { Pipe, PipeTransform } from '@angular/core';
import { MovieService } from '../service/movie.service';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {
  constructor(private movieService: MovieService) { }
  transform(value: string): string {
    const cleanWords = [];
    let splittedTitle = value.split(" ");
    for (let i = 0; i < splittedTitle.length; i++) {
      let word = splittedTitle[i].split("");
      for (let x = 0; x < word.length; x++) {
        if (/^[a-zA-Z]/.test(word[x]) == false) {
          word.splice(x, 1);
          x--;
        }
      }
      cleanWords.push(this.movieService.fixTitle(word.join("")));
    }
    return cleanWords.join(" ");
  }

}
