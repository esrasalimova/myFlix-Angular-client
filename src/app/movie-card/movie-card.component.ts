import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  faves: any[] = [];
  username = localStorage.getItem('username');

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

  getDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      }
    })
  }
  descriptionDetails(description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { description }
    })
  }
  genreDetails(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description
      }
    })
  }

  toggleFavoriteMovie(movieId: any, movieTitle: any): void {
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      const favoriteMovies = resp.favoriteMovies;

      if (favoriteMovies.includes(movieId)) {
        this.fetchApiData
          .removeMovieFavorites(this.username, movieId)
          .subscribe(() => {
            this.snackBar.open(
              `"${movieTitle}" was removed from your Favorites list!`,
              'OK',
              {
                duration: 3000,
              }
            );
          });
      } else {
        this.fetchApiData
          .addMovieFavorites(this.username, movieId)
          .subscribe(() => {
            this.snackBar.open(
              `"${movieTitle}" was added to your Favorites list!`,
              'OK',
              {
                duration: 3000,
              }
            );
          });
      }
    });
  }

  
  

}
