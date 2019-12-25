import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../client.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(next => {
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
}
