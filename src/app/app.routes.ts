/**
 * Created by wangdi on 26/5/17.
 */
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { TableComponent } from './dashboard/table/table.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { SweetAlertComponent } from './dashboard/sweetalert/sweetalert.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { PriceTableComponent } from './dashboard/component/pricetable/pricetable.component';
import { PanelsComponent} from './dashboard/component/panels/panels.component';
import { WizardComponent } from './dashboard/component/wizard/wizard.component';
import { LoaderComponent } from './loader/loader.component';
import { RootComponent } from './dashboard/root/root.component';
import { LoginComponent } from './page/login/login.component';
import { LockComponent } from './page/lock/lock.component';
import { RegisterComponent } from './page/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { GridlistComponent} from './gridlist/gridlist.component';
import { TablelistComponent } from './tablelist/tablelist.component';
import { SinglecolumntableComponent} from './singlecolumntable/singlecolumntable.component';

const routes: Routes = [
  {path: '', component: LoginComponent , canActivate: [LoginGuardService]},
  {path: 'lock', component: LockComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'loader', component: LoaderComponent , canActivate: [AuthGuard]},
  { path: 'grid' , component : GridlistComponent ,  canActivate: [AuthGuard]},
  { path: 'table' , component : TablelistComponent ,  canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]} ,
  {path: 'singletable', component: SinglecolumntableComponent,  canActivate: [AuthGuard]} ,
 // {path: 'dashboard', component: HomeComponent,  canActivate: [AuthGuard]} ,
  {path: 'dashboard' ,  children: [
    {path: '', component: HomeComponent , canActivate: [AuthGuard]},
  //  {path: 'loader', component: LoaderComponent , canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]} ,
    {path: 'table', component: TableComponent},
    {path: 'notification', component: NotificationComponent},
    {path: 'alert', component: SweetAlertComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'components/price-table', component: PriceTableComponent},
    {path: 'components/panels', component: PanelsComponent},
    {path: 'components/wizard', component: WizardComponent}
   
  ]},
  {path: '**', component : PageNotFoundComponent , canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

