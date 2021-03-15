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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, MessagingService, CustomvalidationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
