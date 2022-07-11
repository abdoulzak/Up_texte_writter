import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NumberIntMaskDirective } from './number-int-mask.directive';
import { NumberMaskDirective } from './number-mask.directive';
import { PhoneMaskDirective } from './phone-mask.directive';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { AuthInterceptorProvider } from './http-interceptor/auth-interceptor';
import { NewcommandeComponent } from './components/newcommande/newcommande.component';
import { ValidecommandeComponent } from './components/validecommande/validecommande.component';
import { ConfirmationprisetexteComponent } from './components/confirmationprisetexte/confirmationprisetexte.component';
import { DetalcommandeComponent } from './components/detalcommande/detalcommande.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    PhoneMaskDirective,
    NumberMaskDirective,
    NumberIntMaskDirective,
    NewcommandeComponent,
    ValidecommandeComponent,
    ConfirmationprisetexteComponent,
    DetalcommandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  exports: [
    PhoneMaskDirective,
    NumberMaskDirective,
    NumberIntMaskDirective
  ],
  providers: [
      BeforeLoginService, 
      AfterLoginService,
      AuthInterceptorProvider,
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

