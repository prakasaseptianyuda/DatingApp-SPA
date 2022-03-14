import { AccountService } from './../../_services/account.service';
import { UserParam } from './../../_models/userParam';
import { MembersService } from './../../_services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members : Member[];
  pagination : Pagination;
  userParams: UserParam;
  user : User;
  genderList : {value : string, display : string}[];
  // members$ : Observable<Member[]>;

  constructor(private memberService : MembersService) {
    this.userParams = this.memberService.getUserParams();
    // this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
    //   this.user = user;
    //   this.userParams = new UserParam(user);
    // })
   }

  ngOnInit(): void {
    this.genderList = [{value : 'male', display : 'Male'},{value : 'female', display : 'Female'}];
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilter(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event:any)
  {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

}
