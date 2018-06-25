import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routes';
// import { SocialLoginModule } from 'angularx-social-login';
/* import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
 */
import 'hammerjs';
import 'hammer-timejs';
import { MatButtonModule, MatListModule, MatSidenav , MatSidenavContent , MatGridListModule , 
  MatToolbarModule , MatRadioModule, MatInputModule, MatMenuModule, MatCheckboxModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
 import { ServiceWorkerModule } from '@angular/service-worker';
import { TaskResolver } from './services/taskresolver.service';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import 'hammerjs';
import { environment } from '../environments/environment';
import { MatPaginatorModule } from '@angular/material';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FigurecardComponent } from './shared/figurecard/figurecard.component';
import { ImagecardComponent } from './shared/imagecard/imagecard.component';
import { TableComponent } from './dashboard/table/table.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { MsgIconBtnComponent } from './shared/msgiconbtn/msgiconbtn.component';
import { SweetAlertComponent } from './dashboard/sweetalert/sweetalert.component';
import { LoginComponent } from './page/login/login.component';
import { RootComponent } from './dashboard/root/root.component';
import { RegisterComponent } from './page/register/register.component';
import { LockComponent } from './page/lock/lock.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { PriceTableComponent } from './dashboard/component/pricetable/pricetable.component';
import { PanelsComponent } from './dashboard/component/panels/panels.component';
import { MatTableModule } from '@angular/material';
import { SettingsService } from './services/settings.service';
import { WizardComponent } from './dashboard/component/wizard/wizard.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { DataTablesModule } from 'angular-datatables';
import { LoaderComponent } from './loader/loader.component';
import { SafepipePipe } from './safepipe.pipe';
import {NewsletterService} from './messaging.service';
import { LoginstatusService } from './loginstatus.service';
import { AuthService } from './services/auth-service';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GridlistComponent } from './gridlist/gridlist.component';
import { TablelistComponent } from './tablelist/tablelist.component';
import { SinglecolumntableComponent } from './singlecolumntable/singlecolumntable.component';
import { OnlineAvailableService } from './services/online-available.service';
import { AppDataService } from './app-data.service';
import { Angular2SocialLoginModule } from "angular2-social-login";
// import { MaterialModule } from './material.module';
/* let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("992431806044-7hrvnra3i4avaac7s1ac6irsogv2e21d.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("226677654608213")
  }
]); */

let providers = {
  "google": {
    "clientId": "992431806044-7hrvnra3i4avaac7s1ac6irsogv2e21d.apps.googleusercontent.com"
  },
 /*  "linkedin": {
    "clientId": "LINKEDIN_CLIENT_ID"
  }, */
  "facebook": {
    "clientId": "226677654608213",
    "apiVersion": "v3.0" //like v2.4
  }
};

/* export function provideConfig() {
  return config;
} */
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    FigurecardComponent,
    ImagecardComponent,
    TableComponent,
    NotificationComponent,
    MsgIconBtnComponent,
    SweetAlertComponent,
    LoginComponent,
    RootComponent,
    RegisterComponent,
    LockComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    PriceTableComponent,
    PanelsComponent,
    WizardComponent,
    DisplayTableComponent,
    LoaderComponent,
    SafepipePipe,
    PageNotFoundComponent,
    GridlistComponent,
    TablelistComponent,
    SinglecolumntableComponent
  ],
  imports: [HttpClientModule, MatGridListModule,Angular2SocialLoginModule,
    DataTablesModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule, MatToolbarModule ,
    MatRadioModule,
    MatInputModule, MatIconModule,
    MatMenuModule,
    MatCheckboxModule, MatTableModule ,
    MatPaginatorModule , MatListModule , MatSidenavModule,
     ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }), 
   // SocialLoginModule
  ],
  providers: [
    AuthService, AuthGuardService, LoginGuardService, SettingsService , TaskResolver , NewsletterService , LoginstatusService, OnlineAvailableService, AppDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
