import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeader } from './paginationHelper';
import { Message } from '../_models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMessages(pageNumber, pageSize, container){
    let params = getPaginationHeader(pageNumber,pageSize);
    params = params.append("container", container);
    return getPaginatedResult<Message[]>(this.baseUrl + 'message', params , this.http);
  }

  getMessageThread(username : string){
    return this.http.get<Message[]>(this.baseUrl + "message/thread/" + username );
  }

  sendMessage(username: string, content: string){
    return this.http.post<Message>(this.baseUrl + "message", {recipientUsername: username, content});
  }

  deleteMessage(id: number){
    return this.http.delete(this.baseUrl + 'message/' + id);
  }
}
