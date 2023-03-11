import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { PanelModule } from './panel/panel.module';
import { PathGuard } from './path.guard';

const routes: Routes = [  
  {path:'' , redirectTo: 'Register' , pathMatch:'full'},
  {path: 'panel',loadChildren: ()=> import('src/app/panel/panel.module').then(m => m.PanelModule), canActivate:[PathGuard]
},
{path: 'Register' , component:RegisterComponent},
{path: "Login" , component:LoginComponent},
{path: '**' , component:PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
