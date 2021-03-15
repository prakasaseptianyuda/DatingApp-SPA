import { AccountService } from './../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private http: HttpClient, private accountService: AccountService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register()
  {
    // tslint:disable-next-line: deprecation
    this.accountService.register(this.model).subscribe(response => {
      this.cancel();
    }, err => {
      this.toastr.error(err.error);
    });
  }

  cancel()
  {
    this.cancelRegister.emit(false);
  }

}
