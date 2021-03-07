import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User>;
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

  logout()
  {
    this.accountService.logout();
  }

  // getCurrentUser()
  // {
  //   this.accountService.currentUser$.subscribe(user =>{
  //     this.loggedIn = !!user;
  //   }, err => {
  //     console.log(err);
  //   });
  // }

}
