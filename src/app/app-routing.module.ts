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
    { path: "home", component: HomeComponent, },
    {path: "build", component: BuildComponent},
    {path: "block", component: BlockComponent},
    {path: "confirm", component: ConfirmComponent},
    {path: "blockchain", component: BlockchainComponent,
     canActivate: [AuthGuard]},
    {path: "available", component: AvailableComponent},
    {path: "login", component: LoginComponent},
    {path: "login/:error", component: LoginComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
