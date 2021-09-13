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
  movies: any[] = [];
  favoriteMovieIds: any[] = [];
  // Set user's username.
  username = localStorage.getItem('username');

  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetch all movies in user's Favorites list
   * @returns All movies stored in the user's Favorites list
   */

  getMovies(): void {
    const user=localStorage.getItem ('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovieIds = resp.favoriteMovies;
      console.log(this.movies);
      return this.movies;
    });

  }

  /**
   * Open dialog to show director description through MovieDirectorComponent
   * @param name 
   * @param bio 
   * @param birth 
   * @param death 
   */

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

  /**
   * Open dialog to show movie description through MovieDescriptionComponent
   * @param description 
   */
  descriptionDetails(description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { description }
    })
  }

  /**
   * Open dialog to show movie genre detail through MovieGenreComponent
   * @param name 
   * @param description 
   */
  genreDetails(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description
      }
    })
  }

  /**
   * Add or remove movies from the favorites list of user
   * @param movieId 
   * @param movieTitle 
   */
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
