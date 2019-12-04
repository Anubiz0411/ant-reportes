import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any;
  logging: boolean = false;
  message: string;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
      ]]
    });
    
  }

  onLogin() {
    this.logging = true;
    this.auth.emailSignin(this.loginForm.value.email, this.loginForm.value.password).catch((err) => {
      console.log('Falló la conexión: ' + err);
      this.logging = false;
      this.message = err;
    });
  }

}
