import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// General Components
import { HomeComponent } from './components/pages/general/home/home.component';
import { AboutComponent } from './components/pages/general/about/about.component';
import { DemoComponent } from './components/pages/general/demo/demo.component';
import { PricingComponent } from './components/pages/general/pricing/pricing.component';
// Auth Components
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { PasswordresetComponent } from './components/pages/authentication/passwordreset/passwordreset.component';
import { ResetrequestComponent } from './components/pages/authentication/resetrequest/resetrequest.component';
import { CheckemailComponent } from './components/pages/authentication/checkemail/checkemail.component';
// User Components
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { AccountComponent } from './components/pages/user/account/account.component';
import { CustomersComponent } from './components/pages/user/customers/customers.component';
import { MenuComponent } from './components/pages/user/menu/menu.component';
import { ProductsComponent } from './components/pages/user/products/products.component';
import { HomeComponent as UserHomeComponent } from './components/pages/user/home/home.component';
// Customer Components
import { HomeComponent as CustomerHomeComponent } from './components/pages/customer/home/home.component';
import { ThankyouComponent } from './components/pages/customer/thankyou/thankyou.component';
// Navigation Components
import { NotfoundComponent } from './components/navigation/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'pricing', component: PricingComponent },
  // Authentication routes
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/resetrequest', component: ResetrequestComponent },
  { path: 'auth/checkemail', component: CheckemailComponent },
  { path: 'auth/passwordreset/:id', component: PasswordresetComponent },
  // User routes
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user/account', component: AccountComponent },
  { path: 'user/customers', component: CustomersComponent },
  { path: 'user/menu', component: MenuComponent },
  { path: 'user/products', component: ProductsComponent },
  { path: 'user/home', component: UserHomeComponent },
  // Customer routes
  { path: 'customer/home', component: CustomerHomeComponent },
  { path: 'customer/thankyou', component: ThankyouComponent },
  // Wildcard route
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
