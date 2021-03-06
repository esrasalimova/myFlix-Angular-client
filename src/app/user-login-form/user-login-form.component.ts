import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Server-side API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Service for displaying snack-bar notifications.
import { MatSnackBar } from '@angular/material/snack-bar';
// Reference to a dialog opened via the MatDialog service.
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  /**
   * Send user data to server-side validation and login
   */

  loginUser(): void {
    console.log(this.userData)
    this.fetchApiData.userLogin(this.userData).subscribe(
      // Login successful.
      (response) => {
        // Store current user and token in localStorage.
        localStorage.setItem('username', response.user.Username);
        localStorage.setItem('token', response.token);
        console.log(this.userData)

        this.dialogRef.close();
        this.snackBar.open(`Welcome back, ${response.user.name}!`, 'OK', {
          duration: 3000,
        });
        this.router.navigate(['movies']);
      },
      // Login unsuccessful.
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 3000,
        });
      }
    );
  }
}