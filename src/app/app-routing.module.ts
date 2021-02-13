import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildComponent } from './build/build.component';
import {HomeComponent} from './home/home.component';
import {BlockComponent} from './block/block.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {BlockchainComponent} from './blockchain/blockchain.component';
import{AvailableComponent} from './available/available.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
const routes: Routes = [
    { path: "home", component: HomeComponent, data: {animation: 'HomePage'} },
    {path: "build", component: BuildComponent, data: {animation: 'BuildPage'}},
    {path: "block", component: BlockComponent, data: {animation: 'BlockPage'}},
    {path: "confirm", component: ConfirmComponent, data: {animation: 'ConfirmPage'}},
    {path: "blockchain", component: BlockchainComponent,
     canActivate: [AuthGuard], data: {animation: 'BlockchainPage'}},
    {path: "available", component: AvailableComponent, data: {animation: 'AvailablePage'}},
    {path: "login", component: LoginComponent, data: {animation: 'LoginPage'}},
    {path: "login/:error", component: LoginComponent, data: {animation: 'LoginPage'}},
    {path: "", redirectTo: "/home", pathMatch: "full", data: {animation: 'HomePage'}},
    {path: "**", redirectTo: "/home", data: {animation: 'HomePage'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
