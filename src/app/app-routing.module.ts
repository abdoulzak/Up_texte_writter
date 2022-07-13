import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ValidecommandeComponent } from './components/validecommande/validecommande.component';
import { WrittetexteComponent } from './components/writtetexte/writtetexte.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: 'accueil' },
    { path: 'accueil', component: DashboardComponent  },
    { path: 'writter/:dd', component: WrittetexteComponent  },
  ]},
  { path: 'commande/:dd', component: ValidecommandeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
