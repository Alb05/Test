import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ValidateDirective } from './directives/validate.directive';
import { CartComponent } from './components/cart/cart.component';
import { EqualValidator } from './directives/password.directive';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { AdminDeliveryComponent } from './components/admin-delivery/admin-delivery.component';
import { AdminIntelligenceComponent } from './components/admin-intelligence/admin-intelligence.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ValidateDirective,
    CartComponent,
    EqualValidator,
    DeliveryComponent,
    AdminDeliveryComponent,
    AdminIntelligenceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgHttpLoaderModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cart', component: CartComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'admindelivery', component: AdminDeliveryComponent },
      { path: 'adminintelligence', component: AdminIntelligenceComponent },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
