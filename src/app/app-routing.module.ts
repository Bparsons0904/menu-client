import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { ProfileComponent } from './components/pages/authentication/profile/profile.component';
// General Components
import { AboutComponent } from './components/pages/general/about/about.component';
import { DemoComponent } from './components/pages/general/demo/demo.component';
import { PricingComponent } from './components/pages/general/pricing/pricing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'pricing', component: PricingComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
