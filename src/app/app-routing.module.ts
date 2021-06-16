import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
      path: "home",
      component: HomeComponent
    },
    {
      path: "hello",
      component: HelloWorldComponent
    },
    {
      path: "",
      pathMatch: "full",
      redirectTo: "home"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
