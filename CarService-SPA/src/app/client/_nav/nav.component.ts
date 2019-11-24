import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../client.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private alertify: AlertifyService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedInAsAdmin() {
    return this.authService.loggedIn() && this.authService.decodedToken.role === 'Admin';
  }

  loggedInAsUser() {
    return this.authService.loggedIn() && this.authService.decodedToken.role !== 'Admin';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.alertify.message('Logged Out');
  }
}
