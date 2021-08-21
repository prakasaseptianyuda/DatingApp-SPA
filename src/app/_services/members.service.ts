import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members:Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers()
  {
    if (this.members.length > 0) {
      return of(this.members);
    }
    return this.http.get<Member[]>(this.baseUrl + 'user').pipe(
      map(members => {
        this.members = members;
        return this.members;
      })
    );
  }

  getMemberByUsername(username: string)
  {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'user/GetMemberByUsername/' + username);
  }

  getMemberById(id: string)
  {
    const member = this.members.find(x => x.userId === parseInt(id));
    if (member !== undefined) {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'user/' + id);
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
}