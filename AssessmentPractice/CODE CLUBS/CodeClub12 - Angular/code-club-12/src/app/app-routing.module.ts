import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OutputComponent} from "./output/output.component";
import {InputComponent} from "./input/input.component";

const routes: Routes = [
  {path: '', redirectTo: 'input', pathMatch: 'full'},
  {path: 'input', component:InputComponent},
  {path: 'output', component: OutputComponent},
  {path: '**', redirectTo: 'input'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
