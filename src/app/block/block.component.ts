import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {BcConfig} from '../bcConfig';
import {Block} from '../block';
import { identifierModuleUrl, ThrowStmt } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import {Router} from '@angular/router';
@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  bcConfigs!: BcConfig;
  blockdata!: Block;
  block!: FormGroup;
  str!: string;
  header!: string;
  constructor(private storage: StorageService,
              private fb: FormBuilder,
              private router: Router) {
                this.createForm();
               }

  ngOnInit(): void {
    this.storage.sendBcConfigs().then((data) => {
      this.bcConfigs = data;
      if(data.blocks == null){
        this.header = "Genesis Block";
      }
    });
  }
  createForm(){
    this.block = this.fb.group({
      sender: "",
      receiver: "",
      sending: "",
      raw_data: "",
    });
  }
  submit(){
   // console.log(this.block.value);
    this.blockdata = this.block.value;
    if(this.bcConfigs.blocks == null){
      this.blockdata.block_id = "0";
    }
    else{
    this.blockdata.block_id = this.bcConfigs.blocks.length.toString();
    }
    if(this.bcConfigs.blocks == null){
      this.blockdata.previous_hash = "";
    }
    else{
      this.blockdata.previous_hash = 
      this.bcConfigs.blocks[this.bcConfigs.blocks.length-1].hash;
    }
    this.blockdata.golden_nonce = (Math.floor(Math.random() * 4000)).toString();

    this.str = this.blockdata.sender + this.blockdata.receiver
             + this.blockdata.sending + this.blockdata.raw_data
             + this.blockdata.previous_hash 
             + this.blockdata.golden_nonce;
    this.blockdata.hash = this.hash64(this.str);
    // if(this.bcConfigs.blocks == null){
    //   this.bcConfigs.blocks = [];
    // }
    //this.bcConfigs.blocks.push(this.blockdata);
    //console.log("I am printing all bcConfigs and its block data");
    // console.log(this.bcConfigs);
    this.block.reset();
    this.storage.updateBcConfigs(this.bcConfigs);
    this.storage.updateBlock(this.blockdata);
    this.router.navigate(["confirm"]);
  }

  hval: any;

  hashFnv32a(str: string, asString: boolean, seed: string) {
    /*jshint bitwise:false */
       var  i, l;
        this.hval  = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        this.hval ^= str.charCodeAt(i);
        this.hval += (this.hval << 1) + (this.hval << 4) + (this.hval << 7) + (this.hval << 8) + (this.hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (this.hval >>> 0).toString(16)).substr(-8);
    }
    return this.hval >>> 0;
}

hash64(str: string) {
    var h1 = this.hashFnv32a(str,true,"");  // returns 32 bit (as 8 byte hex string)
    return h1.toString() + this.hashFnv32a(h1 + str, true,"");  // 64 bit (as 16 byte hex string)
}

}
