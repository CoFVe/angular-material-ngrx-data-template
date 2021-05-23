import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  title!: string;

  constructor() {
    this.title = "Login Page";
  }

  ngOnInit() {
  }

}
