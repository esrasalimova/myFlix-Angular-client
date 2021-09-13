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
  user: any = {};
  movies: any[] = [];
  faves: any[] = [];
  favorites: any[] = [];
  favoriteMovieIds: any[] = [];
  username = localStorage.getItem('username');

  constructor(public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getMovies();
    
  }

  /**
   * @returns favorite movies of user
   */

  favedMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) =>{
      this.favoriteMovieIds = resp.FavoriteMovies;
    });
  }

  /**
   * Fetch all movies from database
   * @returns All movies stored in the database
   */


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }
  
    /**
     * Get director by
     * @param name 
     * @param bio 
     * @param birth 
     * @param death 
     * through moviedirector component
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
   * Open dialog to show movie genre details through MovieGenreComponent
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
   * Add or remove movies from the Favorites list
   * @param id 
   * @param movieTitle 
   */


  toggleFavoriteMovie(id: string, movieTitle: any): void {
    this.fetchApiData.addMovieFavorites(this.username, id).subscribe((resp: any) => {
      const favoriteMovies = resp.favoriteMovies;

      if (favoriteMovies.includes(id)) {
        this.fetchApiData
          .removeMovieFavorites(this.username, id)
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
          .addMovieFavorites(this.username, id)
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
