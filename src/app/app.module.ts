import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { AuthService } from './services/auth.service';
import { MessagingService } from './services/messaging.service';
import { CustomvalidationService } from './services/customvalidation.service';
import { ProfileService } from './services/profile.service';
import { ProductService } from './services/product.service';

// Modules
import { YouTubePlayerModule } from '@angular/youtube-player';

// Components
import { HomeComponent } from './components/pages/general/home/home.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { LoadingComponent } from './components/navigation/loading/loading.component';
import { MessagesComponent } from './components/navigation/messages/messages.component';
import { LoginComponent } from './components/pages/authentication/login/login.component';
import { RegisterComponent } from './components/pages/authentication/register/register.component';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { AboutComponent } from './components/pages/general/about/about.component';
import { PricingComponent } from './components/pages/general/pricing/pricing.component';
import { DemoComponent } from './components/pages/general/demo/demo.component';
import { UsersComponent } from './components/pages/admin/users/users.component';
import { CustomersComponent } from './components/pages/admin/customers/customers.component';
import { ThankyouComponent } from './components/pages/customer/thankyou/thankyou.component';
import { WaitingComponent } from './components/navigation/waiting/waiting.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordresetComponent } from './components/pages/authentication/passwordreset/passwordreset.component';
import { ResetrequestComponent } from './components/pages/authentication/resetrequest/resetrequest.component';
import { CheckemailComponent } from './components/pages/authentication/checkemail/checkemail.component';
import { MenuComponent } from './components/pages/user/menu/menu.component';
import { ProductsComponent } from './components/pages/user/products/products.component';
import { AccountComponent } from './components/pages/user/account/account.component';
import { NotfoundComponent } from './components/navigation/notfound/notfound.component';
import { ProductCreateComponent } from './components/pages/user/modules/product-create/product-create.component';
import { RegisteredComponent } from './components/pages/authentication/registered/registered.component';
import { ProductEditComponent } from './components/pages/user/modules/product-edit/product-edit.component';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from 'src/environments/environment';

const uri: string = environment.uri;

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
    PasswordresetComponent,
    ResetrequestComponent,
    CheckemailComponent,
    MenuComponent,
    ProductsComponent,
    AccountComponent,
    NotfoundComponent,
    ProductCreateComponent,
    RegisteredComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    YouTubePlayerModule,
  ],
  providers: [
    AuthService,
    MessagingService,
    CustomvalidationService,
    ProfileService,
    ProductService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: uri,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
