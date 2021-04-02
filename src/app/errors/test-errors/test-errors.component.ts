import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = 'https://localhost:44374/api/';
  validationErrors: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error()
  {
    // tslint:disable-next-line: deprecation
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400Error()
  {
    // tslint:disable-next-line: deprecation
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get500Error()
  {
    // tslint:disable-next-line: deprecation
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error, "error");
    });
  }

  get401Error()
  {
    // tslint:disable-next-line: deprecation
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400ValidationError()
  {
    // tslint:disable-next-line: deprecation
    this.http.post(this.baseUrl + 'account/register', {}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error;
    });
  }

}
