import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Access } from 'src/app/core/models/access.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    public titleService: Title,
    private userService: UserService,
  ){}

  public async ngOnInit(): Promise<void> {
    this.titleService.setTitle("Login");

    const access: Access = {
      username: "josemi",
      password: "Inflames19",
    };

    //await this.userService.attemptAuth(access);
  }
}

