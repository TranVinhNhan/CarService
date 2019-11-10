import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../client.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {

    this.authService.login(this.model).subscribe(next => {
      if (this.authService.decodedToken.role === 'Admin') {
      this.alertify.success('Logged in as adminstrator');
    } else {
      this.alertify.success('Logged in!');
    }
    }, error => {
      this.alertify.error(error);
    }, () => {
      if (this.authService.decodedToken.role === 'Admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
