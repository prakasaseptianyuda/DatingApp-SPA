import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User>;
  loggedIn: boolean;
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login()
  {
    // tslint:disable-next-line: deprecation
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, err => {
      // this.toastr.error(err.error);
    });

    // tslint:disable-next-line: deprecation
    // this.accountService.login(this.model).subscribe({
    //   next: () => {
    //     console.log("next");
    //   },
    //   error: () => {
    //     console.log("error");
    //   },
    //   complete: () => {
    //     console.log("finally");
    //   }
    // });
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.model = {};
  }

  getCurrentUser()
  {
    // tslint:disable-next-line: deprecation
    this.accountService.currentUser$.subscribe(user => {
      this.loggedIn = !!user;
    }, error => {});
  }

}
