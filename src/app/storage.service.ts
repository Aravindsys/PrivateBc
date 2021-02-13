import { ParsedEvent } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {BcConfig} from './bcConfig';
import {Block} from './block';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  bcConfigs!: BcConfig;
  block!: Block;
  array!: any[];
  blockchainId!: string;
  username!: string;
  password!: string;
  params!: boolean;
  constructor(private http: HttpClient) { }
  updateUser(username: string, password: string){
    this.username = username;
    this.password = password;
  }
  sendFull(){
  //   const headers = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "X-Parse-Application-Id": "9HMm2HmBqrL5EU44PpwAqmbRU3pzfWKoy3w8ZhuO",
  //       "X-Parse-REST-API-Key": "VfVMY728DsAzfY41EaJ7PqC0XAtXRL8DurgXjXeF"
  //       })
  //   } 

  //  return Promise.resolve(this.http.get("https://parseapi.back4app.com/classes/Blockchain"));
  const Blockchain = Parse.Object.extend("Blockchain");
  const blockchain = new Parse.Query(Blockchain);
  return Promise.resolve(blockchain.find().then((data) => {
    this.array = <any>data;
    return data;
  }
  ));
  }
  mineAuthenticate(): boolean{
    return this.params;
  }

  mineUpdate(params: boolean){
    this.params = params;
  }
  authenticate(): boolean {
    for(var i = 0; i < this.array.length; i++){
      if(this.username == this.array[i].get("admin_username")){
        if(this.password == this.array[i].get("password")){
          return true;
        }
      }
       var userArray = this.array[i].get("users").split(",");
       for(var k = 0; k < userArray.length; k++){
         if(this.username == userArray[k]){
           if(this.password = this.array[i].get("password")){
             return true;
           }
         }
       }
    }

    return false;
  }


  sendBlockchainId(id: string){
    for(var i = 0; i < this.array.length; i++){
      if(this.array[i].id == id){
            this.bcConfigs = this.array[i];
      this.bcConfigs.admin_username = this.array[i].get("admin_username");
      this.bcConfigs.name = this.array[i].get("name");
      this.bcConfigs.password = this.array[i].get("password");
      this.bcConfigs.confirm_password = this.array[i].get("confirm_password");
      this.bcConfigs.users = this.array[i].get("users");
      this.bcConfigs.organisation = this.array[i].get("organisation");
      this.bcConfigs.blocks = this.array[i].get("blocks");
      }
    }
    return {
      error: "Not found"
    }
  }

  updateBcConfigs(data: any){
    this.bcConfigs = data;
  }
  updateBlock(data: any){
   this.block = data;
  }
  sendBcConfigs(){
    return Promise.resolve(this.bcConfigs);
  }
  sendBlock(){
    return Promise.resolve(this.block);
  }
  updateToBackend(data: any){
    if(data.blocks.length == 1){
       const Blockchain = Parse.Object.extend("Blockchain");
       const bc = new Blockchain();
       bc.set("name",data.name);
    bc.set("admin_username",data.admin_username);
    bc.set("password",data.password);
    bc.set("confirm_password",data.confirm_password);
    bc.set("users",data.users);
    bc.set("organisation",data.organisation);
    bc.set("blocks",data.blocks);
    bc.save().then((bcConfig: any) => {
           console.log("Inserted successfully/updated to the backend");
           console.log(bcConfig);
           this.blockchainId = bcConfig.id;
           const Blockchain = Parse.Object.extend("Blockchain");
           const blockchain = new Parse.Query(Blockchain);
           blockchain.get(this.blockchainId)
           .then((data) => {
            this.bcConfigs.id = data.id;
            this.bcConfigs.name = data.get("name");
            this.bcConfigs.admin_username = data.get("admin_username");
            this.bcConfigs.password = data.get("password");
            this.bcConfigs.confirm_password = data.get("confirm_password");
            this.bcConfigs.users = data.get("users");
            this.bcConfigs.organisation = data.get("organisation");
            this.bcConfigs.blocks = data.get("blocks");
            this.bcConfigs.createdAt = data.get("createdAt");
            this.bcConfigs.updatedAt = data.get("updatedAt");
           });
    });
    }
  else{
        const Blockchain = Parse.Object.extend("Blockchain");
        const bc = new Parse.Query(Blockchain);
        bc.get(data.id).then((raw) => {
          raw.set("blocks",data.blocks);
          raw.save().then((data) => {
            this.bcConfigs.id = data.id;
            this.bcConfigs.name = data.get("name");
            this.bcConfigs.admin_username = data.get("admin_username");
            this.bcConfigs.password = data.get("password");
            this.bcConfigs.confirm_password = data.get("confirm_password");
            this.bcConfigs.users = data.get("users");
            this.bcConfigs.organisation = data.get("organisation");
            this.bcConfigs.blocks = data.get("blocks");
            this.bcConfigs.createdAt = data.get("createdAt");
            this.bcConfigs.updatedAt = data.get("updatedAt");
           });
        })
   }

}
}
