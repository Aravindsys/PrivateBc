import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {BcConfig} from '../bcConfig';
import {Block} from '../block';
import {Router} from '@angular/router';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  latestBlock!: Block;
  bcConfig!: BcConfig;
  constructor(private storage: StorageService,
          private router: Router) { }

  ngOnInit(): void {
    this.storage.sendBcConfigs().then((data) => {
      this.bcConfig = data;
    });
    this.storage.sendBlock().then((data) => {
      this.latestBlock = data;
    })
  }

  submit(){
    if(this.bcConfig.blocks == null){
         this.bcConfig.blocks = [];
       }
    this.bcConfig.blocks.push(this.latestBlock);
    //Updating in the back4app part
    console.log("Logging after the final: ");
    console.log(this.bcConfig);
    this.storage.updateToBackend(this.bcConfig);
    this.storage.mineUpdate(true);
    setTimeout("2000");
    this.router.navigate(['blockchain']);
  }


}
