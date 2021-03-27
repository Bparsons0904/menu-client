import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Auth Components
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { PasswordresetComponent } from './components/pages/authentication/passwordreset/passwordreset.component';
import { ResetrequestComponent } from './components/pages/authentication/resetrequest/resetrequest.component';
import { CheckemailComponent } from './components/pages/authentication/checkemail/checkemail.component';
// General Components
import { HomeComponent } from './components/pages/general/home/home.component';
import { AboutComponent } from './components/pages/general/about/about.component';
import { DemoComponent } from './components/pages/general/demo/demo.component';
import { PricingComponent } from './components/pages/general/pricing/pricing.component';
// Customer Components
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { HomeComponent as CustomerHomeComponent } from './components/pages/customer/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'customer/home', component: CustomerHomeComponent },
  { path: 'user/resetrequest', component: ResetrequestComponent },
  { path: 'user/checkemail', component: CheckemailComponent },
  { path: 'user/passwordreset/:id', component: PasswordresetComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
