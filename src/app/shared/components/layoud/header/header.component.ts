import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pr-header',
  templateUrl: './header.component.html',
})


export class HeaderComponent implements OnInit {
  public readonly pathToLogin: string = "/public/login";
  public userName: string;
  closeResult: string;
  navisOpen: boolean = false;
  @Output() navisOpenSend = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private router: Router,
    private modal: NgbModal
  ) { }

  public ngOnInit(): void {
    this.loadUserValues();
  }

  private loadUserValues(): void{
    //const user: User = this.userService.getCurrentUser();
    //this.userName = user.name;
  }

  public onClickLogOff(): void {
    this.userService.purgeAuth();
  }
}
