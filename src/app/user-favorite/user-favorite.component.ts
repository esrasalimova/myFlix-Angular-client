import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-favorite',
  templateUrl: './user-favorite.component.html',
  styleUrls: ['./user-favorite.component.scss']
})
export class UserFavoriteComponent implements OnInit {
  movie: any[] = [];
  favorite: any[] = [];
  // Set user's username.
  username = localStorage.getItem('username');

  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFavoritesMovies();
  }

  getFavoritesMovies(): void {
    this.fetchApiData.getFavorites(this.username).subscribe((resp: any) => {
      const favoriteMovies = resp.favoriteMovies;

      favoriteMovies.forEach((favoriteMovie: any) => {
        this.fetchApiData.getMovie(favoriteMovie).subscribe((resp: any) => {
          this.movie.push(resp);
        });
        return this.movie;
      });
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
