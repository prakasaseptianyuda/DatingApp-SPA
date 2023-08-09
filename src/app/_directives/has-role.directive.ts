import { User } from './../_models/user';
import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input('appHasRole') appHasRole: string[] =[];
  user: User = {} as User;

  constructor(private viewContainerRef : ViewContainerRef, private templateRef: TemplateRef<any>, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.user = user;
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.user.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      this.viewContainerRef.clear();
    }
  }

}
