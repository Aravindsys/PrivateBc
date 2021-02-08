import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSliderModule} from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildComponent } from './build/build.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import {StorageService} from './storage.service';
import { BlockComponent } from './block/block.component';
import { ConfirmComponent } from './confirm/confirm.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './auth.guard';
import * as Parse from 'parse';

import { BlockchainComponent } from './blockchain/blockchain.component';
import { AvailableComponent } from './available/available.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    BuildComponent,
    HomeComponent,
    BlockComponent,
    ConfirmComponent,
    BlockchainComponent,
    AvailableComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [StorageService,
             AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
