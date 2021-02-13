import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {BcConfig} from '../bcConfig';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Naming} from "../naming";
@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.scss']
})
export class AvailableComponent implements OnInit {

  constructor(private storage: StorageService,
             private router: Router) { }

  results: Naming[] = [];
  ngOnInit(): void {
    this.storage.sendFull().then((data: any) => {
        for(var i = 0; i < data.length; i++){
         this.results.push({
           id: data[i].id,
           name: data[i].get("name"),
           admin_username: data[i].get("admin_username"),
           organisation: data[i].get("organisation")
         });
        }
    });

    }
    submit(id: string){
      //console.log("Recieved id: "+id);
      this.storage.sendBlockchainId(id);
      this.router.navigate(['login']);
    }
      
  }

