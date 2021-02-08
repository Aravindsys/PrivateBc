import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';
import {StorageService} from '../storage.service';
import {BcConfig} from "../bcConfig";
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  bcConfig!: FormGroup;
  bcConfigModal!: BcConfig;
  organisations = ["Retail","Finance","Health care","Ministry",
            "Sports","Education","Technology","Civil and crimes",
            "Manufacturing","Electricity","Energy",
           "Transport"];
  constructor(private fb: FormBuilder,
              private storage: StorageService,
              private router: Router,
              private route: ActivatedRoute) { 
   this.createForm();
  }

  ngOnInit(): void {
  }
  createForm(){
    this.bcConfig = this.fb.group({
      name: "",
      admin_username: "",
      password: "",
      confirm_password: "",
      users: "",
      organisation: "",
    });
  }

  submit(){
   this.bcConfigModal = this.bcConfig.value;
  // console.log(this.bcConfigModal);
   this.storage.updateBcConfigs(this.bcConfigModal);
   this.bcConfig.reset();
   this.router.navigate(['block']);
  }

}
