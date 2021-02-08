import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';
import {BcConfig} from '../bcConfig';
@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent implements OnInit {

  bcConfig!: BcConfig;
  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.storage.sendBcConfigs()
      .then((data) => {
        this.bcConfig = data;
      });
  }

}
