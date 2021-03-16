import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { AuthService } from './services/auth.services';
import { MessagingService } from './services/messaging.service';
import { CustomvalidationService } from './services/customvalidation.service';

// Components
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { LoadingComponent } from './components/navigation/loading/loading.component';
import { MessagesComponent } from './components/navigation/messages/messages.component';
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { ProfileComponent } from './components/pages/authentication/profile/profile.component';
import { AboutComponent } from './components/pages/general/about/about.component';
import { PricingComponent } from './components/pages/general/pricing/pricing.component';
import { DemoComponent } from './components/pages/general/demo/demo.component';
import { UsersComponent } from './components/pages/admin/users/users.component';
import { CustomersComponent } from './components/pages/admin/customers/customers.component';
import { ThankyouComponent } from './components/pages/customer/thankyou/thankyou.component';
import { WaitingComponent } from './components/navigation/waiting/waiting.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    LoadingComponent,
    MessagesComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AboutComponent,
    PricingComponent,
    DemoComponent,
    UsersComponent,
    CustomersComponent,
    ThankyouComponent,
    WaitingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [AuthService, MessagingService, CustomvalidationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
