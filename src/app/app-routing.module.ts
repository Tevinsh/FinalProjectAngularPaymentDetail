import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PaymentdetailComponent } from './pages/paymentdetail/paymentdetail.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthguardGuard } from './authguard.guard';
import { SignedinGuard } from './signedin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent , canActivate: [AuthguardGuard]},
  { path: 'login', component: LoginComponent, canActivate: [SignedinGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [SignedinGuard]},
  { path: 'paymentdetail', component: PaymentdetailComponent , canActivate: [AuthguardGuard]},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
