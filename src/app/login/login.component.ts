import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {StorageService} from '../storage.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
             private storage: StorageService,
             private router: Router,
             private route: ActivatedRoute) { }
  user!: FormGroup;
  error!: any;
  ngOnInit(): void {
     this.createForm();
     this.error = this.route.snapshot.paramMap.get("error");
  }

  createForm(){
    this.user = this.fb.group({
      username: "",
      password: ""
    });
  }

  submit(){
      this.storage.updateUser(this.user.value.username,
                        this.user.value.password);
      this.user.reset();
      this.router.navigate(['blockchain']);
  }


}
