import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddReceiverComponent } from './add-receiver/add-receiver.component';
import { MyReceiverComponent } from './my-receiver/my-receiver.component';
import{EditComponent} from "./edit/edit.component"
import { AuthGuard } from './gaurds/auth.guard';
import { SendMoneyComponent } from './send-money/send-money.component';
import { CashPageComponent } from './cash-page/cash-page.component';
// import { BankPageComponent } from './bank-page/bank-page.component';
import { WalletPageComponent } from './wallet-page/wallet-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { BankAccountPageComponent } from './bank-account-page/bank-account-page.component';

const routes: Routes = [
  { 
    path: '', component: LoginComponent
  },
  {
    path: 'addReceiver', canActivate:[AuthGuard], component: AddReceiverComponent 
  },
  {
    path: 'myReceiver', canActivate:[AuthGuard], component: MyReceiverComponent
  },
  {
    path: 'editReceiver/:id', canActivate:[AuthGuard],component: EditComponent
  },
  {
    path: 'sendMoney',component: SendMoneyComponent
  },
  {
    path: 'cashPage',canActivate:[AuthGuard],component: CashPageComponent
  },
  {
    path: 'bankPage',canActivate:[AuthGuard],component: BankAccountPageComponent
  },
  {
    path: 'walletPage',canActivate:[AuthGuard],component: WalletPageComponent
  },
  {
    path: 'editReceiver', canActivate:[AuthGuard], component: EditComponent
  },
  {
    path: 'reviewPage',canActivate:[AuthGuard], component: ReviewPageComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
