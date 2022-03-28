import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    FormsModule,    //added here too
    ReactiveFormsModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
