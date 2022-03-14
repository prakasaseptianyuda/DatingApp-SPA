import { AccountService } from './account.service';
import { UserParam } from './../_models/userParam';
import { PaginatedResult } from './../_models/pagination';
import { map, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { of } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members:Member[] = [];
  memberCache = new Map();
  user: User;
  userParams: UserParam;

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParam(user);
    })
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params: UserParam){
    this.userParams = params;
  }

  resetUserParams(){
    this.userParams = new UserParam(this.user);
    return this.userParams;
  }

  getMembers(userParam : UserParam)
  {
    var response = this.memberCache.get(Object.values(userParam).join('-'));
    if (response) {
      return of(response);
    }
    let params = this.getPaginationHeader(userParam.pageNumber, userParam.pageSize);

    params = params.append('minAge', userParam.minAge.toString());
    params = params.append('maxAge', userParam.maxAge.toString());
    params = params.append('gender', userParam.gender);
    params = params.append('orderBy', userParam.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'user',params)
    .pipe(map(response => {
      this.memberCache.set(Object.values(userParam).join('-'), response);
      return response;
    }));
  }

  getMemberByUsername(username: string)
  {
    console.log(this.memberCache);
    // const member = this.members.find(x => x.username === username);
    // if (member !== undefined) {
    //   return of(member);
    // }
    return this.http.get<Member>(this.baseUrl + 'user/GetMemberByUsername/' + username);
  }

  getMemberById(id: string)
  {
    console.log([...this.memberCache.values()]
    .reduce((arr,el) => arr.concat(el.result), []));

    const member = [...this.memberCache.values()]
      .reduce((arr,el) => arr.concat(el.result), [])
      .find((member : Member) => member.userId == parseInt(id));
    console.log("member",member);
    if (member) {
      return of(member);
    }
    // const member = this.members.find(x => x.userId === parseInt(id));
    // if (member !== undefined) {
    //   return of(member);
    // }
    return this.http.get<Member>(this.baseUrl + 'user/GetMemberById/' + id);
  }

  updateMember(member : Member)
  {
    return this.http.put(this.baseUrl + 'user', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + `user/set-main-photo/${photoId}` ,{});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + `user/delete-photo/${photoId}`);
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult : PaginatedResult<T> = new PaginatedResult<T>();
    
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(
        response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }
      )
    );
  }

  getPaginationHeader(pageNumber: number, pageSize: Number){
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

}
