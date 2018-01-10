import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FacebookModule } from 'ngx-facebook';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }  from "angularfire2/auth";
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';

// ROUTING
import { ROUTES } from './app.routes';

// componentes
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/share/header/header.component';
import { FooterComponent } from './components/share/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';

// // services
import { UserService } from './services/user.service';
import { AmazonService } from './services/amazon.service';
import { UploadService } from './services/upload.service';


import { environment } from '../environments/environment';
import { PasswordComponent } from './components/password/password.component';
import { SendPassComponent } from './components/send-pass/send-pass.component';
import { SendRegisterComponent } from './components/send-register/send-register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    CategoryComponent,
    PasswordComponent,
    SendPassComponent,
    SendRegisterComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ROUTES,
    FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FacebookModule.forRoot(),
    HttpClientModule,
    HttpClient
  ],
  providers: [
    UserService,
    UploadService,
    AmazonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
