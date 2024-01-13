import { Component , OnInit} from '@angular/core';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  movies: any[] = [];
  actors: any[] = [];
  validationResults: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.validateResults();
  }

  validateResults(): void {
    this.dataService.getMovies().subscribe((movies) => {
      this.dataService.getActors().subscribe((actors) => {
        this.validationResults = this.identifyActors(movies, actors);
        this.dataService.validateResults(this.validationResults).subscribe((response) => {
        });
      });
    });
  }

  private identifyActors(movies: any[], actors: any[]): any[] {
    const nicolasCageMovies = movies.filter((movie) => movie.actors.includes(115));
    const keanuReevesMovies = movies.filter((movie) => movie.actors.includes(206));

    const commonActors = actors.filter((actor) => {
      const hasNicolasCageMovie = nicolasCageMovies.some((movie) => movie.actors.includes(actor.actorId));
      const hasKeanuReevesMovie = keanuReevesMovies.some((movie) => movie.actors.includes(actor.actorId));
      return hasNicolasCageMovie && hasKeanuReevesMovie;
    });


    const result = commonActors.map((actor) => {
      const krMovies = keanuReevesMovies
        .filter((movie) => movie.actors.includes(actor.actorId))
        .map((movie) => movie.title);
      const ncMovies = nicolasCageMovies
        .filter((movie) => movie.actors.includes(actor.actorId))
        .map((movie) => movie.title);
      return {
        Name: actor.name,
        KRMovies: krMovies,
        NCMovies: ncMovies,
      };
    });
    return result;
  }

}
