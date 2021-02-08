import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from './storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storage: StorageService,
              private router: Router){
  }

  canActivate(): boolean {
    if(this.storage.mineAuthenticate() || this.storage.authenticate()){
        return true;
    }
    else{
      var error: string = "Access denied. Enter correct credentials";
      this.router.navigate(['login',error]);
      return false;
    }
  }
  
}
