import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// API URL that provides server-side data to the client-side.
const apiUrl = 'https://calm-chamber-83197.herokuapp.com/';

// Create injectable service to use this class in the DI system.
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor parameters.
  constructor(private http: HttpClient) {}

  /**
   * Registration to the API
   * @param userDetails 
   * @returns status message: success/error
   */

  // User registration (Endpoint: 'users', Method: POST).
  public userRegistration(userDetails: any): Observable<any> {
    // Send the any argument to the API endpoint and return the API response.
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Login to the Application
   * @param userDetails 
   * @returns status message: success/error
   */

  // User login (Endpoint: 'login', Method: POST).
  public userLogin(userDetails: any): Observable<any> {
    // Send the any argument to the API endpoint and return the API response.
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get one user by username
   * @param username 
   * @returns Object - data about a user
   */

  // Get user (Endpoint: 'users/:username', Method: GET).
  public getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Update user information
   * @param userDetails 
   * @returns status message: success/error
   */

  // Edit user (Endpoint: 'users/:username', Method: PUT).
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .put(apiUrl + `users/${userDetails.username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete user account
   * @param username (Injected automatically, username extracted from login params)
   * @returns status message
   */

  // Delete user (Endpoint: 'users/:username', Method: DELETE).
  public deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * 
   * @param username (Injected automatically, username extracted from login params)
   * @returns Array - favorie movies of a user
   */

  // Get Favorites list (Endpoint: 'users/:username/favorites', Method: GET).
  public getFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `users/${username}/favorites`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets favorite movies list of a user
   * @returns Request to the database
   */

  // Get Favorites list (Endpoint: 'users/:username/Movies/:MovieID', Method: GET).
  public getMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `users/${username}/Movies/`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Add movie to Favorites list
   * @param username 
   * @param id 
   * @returns request to the database (Endpoint: '/users/:Username/Movies/:MovieID', Method: POST)
   */

  // Add movie to Favorites list (Endpoint: '/users/:Username/Movies/:MovieID', Method: POST).
  public addMovieFavorites(username: any, id: string): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .post(apiUrl + `users/${username}/Movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Remove movie from Favorites list
   * @param username 
   * @param movieId 
   * @returns request to the database (Endpoint: '/users/:Username/Movies/:MovieID', Method: DELETE)
   */

  // Remove movie from Favorites list (Endpoint: '/users/:Username/Movies/:MovieID', Method: DELETE).
  public removeMovieFavorites(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .delete(apiUrl + `users/${username}/Movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get To-Watch List
   * @param username 
   * @returns Request to the database (Endpoint: 'users/:username/towatch', Method: GET)
   */

  // Get To-Watch list (Endpoint: 'users/:username/towatch', Method: GET).
  public getToWatch(username: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `users/${username}/towatch`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Add movie to To--Watch list
   * @param username 
   * @param movieId 
   * @returns 
   */

  // Add movie to To-Watch list (Endpoint: 'users/:username/towatch/:movie_id', Method: POST).
  public addMovieToWatch(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .post(apiUrl + `users/${username}/towatch/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Remove movie from To-Watch List
   * @param username 
   * @param movieId 
   * @returns Request to the database (Endpoint: 'users/:username/towatch/:movie_id', Method: DELETE)
   */

  // Remove movie from To-Watch list (Endpoint: 'users/:username/towatch/:movie_id', Method: DELETE).
  public removeMovieToWatch(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .delete(apiUrl + `users/${username}/towatch/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all movies endpoint
   * @returns Request to the database (Endpoint: 'movies', Method: GET)
   */

  // Get all movies endpoint (Endpoint: 'movies', Method: GET).
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get one movie endpoint
   * @param movieTitle 
   * @returns Request to the database (Endpoint: 'movies/:title', Method: GET)
   */

  // Get one movie endpoint (Endpoint: 'movies/:title', Method: GET).
  public getMovie(movieTitle: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `movies/${movieTitle}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get genres endpoint
   * @returns Request to the database (Endpoint: 'genres', Method: GET)
   */

  // Get genres endpoint (Endpoint: 'genres', Method: GET).
  public getGenres(): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + 'genres', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get one genre endpoint
   * @param genreName 
   * @returns Request to the database (Endpoint: 'genres/:name', Method: GET)
   */

  // Get one genre endpoint (Endpoint: 'genres/:name', Method: GET).
  public getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `genres/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get directors endpoint
   * @returns Request to the database (Endpoint: 'directors', Method: GET)
   */

  // Get directors endpoint (Endpoint: 'directors', Method: GET).
  public getDirectors(): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + 'directors', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get one director endpoint
   * @param directorName 
   * @returns request to the database (Endpoint: 'directors/:name', Method: GET)
   */

  // Get one director endpoint (Endpoint: 'directors/:name', Method: GET).
  public getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get actors endpoint
   * @returns Request to the database (Endpoint: 'actors', Method: GET)
   */

  // Get actors endpoint (Endpoint: 'actors', Method: GET).
  public getActors(): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + 'actors', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Get one actor endpoint
   * @param actorName 
   * @returns Request to the database (Endpoint: 'actors/:name', Method: GET)
   */

  // Get one actor endpoint (Endpoint: 'actors/:name', Method: GET).
  public getActor(actorName: any): Observable<any> {
    const token = localStorage.getItem('token');

    // Pass the token in the HTTP header to the call.
    return this.http
      .get(apiUrl + `actors/${actorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Error handler
   * @param error 
   * @returns http error response
   */

  // Error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error has occurred:', error.error.message);
    } else {
      console.error(
        `Error Status Code: ${error.status}, ` + `Error Body: ${error.error}`
      );
    }
    return throwError('Sorry, an error has occurred. Please try again later.');
  }
}