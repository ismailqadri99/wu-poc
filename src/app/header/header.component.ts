import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGaurdService } from '../Service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  changeSendMoney: boolean = true;
  changeMyReceiver: boolean = false;
  changeLogout: boolean = false;
  changeProfile: boolean = true;
  changeAddReceiver: boolean = false;

  constructor(private router: Router, private auth: AuthGaurdService) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url === '/') {
          this.changeSendMoney = true;
          this.changeMyReceiver = false;
          this.changeLogout = false;
          this.changeAddReceiver = false;
        } else if (val.url === '/addReceiver') {
          this.changeSendMoney = true;
          this.changeMyReceiver = true;
          this.changeLogout = true;
          this.changeAddReceiver = false;
        } else if (val.url === '/myReceiver') {
          this.changeSendMoney = true;
          this.changeMyReceiver = false;
          this.changeLogout = true;
          this.changeAddReceiver = true;
        } else if (val.url === '/sendMoney') {
          this.changeSendMoney = false;
          this.changeMyReceiver = true;
          this.changeLogout = true;
          this.changeAddReceiver = true;
        }
        else if (val.url === '/editReceiver') {
          this.changeSendMoney = true;
          this.changeMyReceiver = true;
          this.changeLogout = true;
          this.changeAddReceiver = false;
        } 
        else if(!this.auth.LoggedIn()){
          this.changeSendMoney=true;
          this.changeAddReceiver=false;
          this.changeMyReceiver=false;
          this.changeLogout=false;

        } else if(val.url === '/cashPage' || val.url === '/walletPage' || val.url === '/bankPage'){
          this.changeSendMoney = true;
          this.changeMyReceiver = false;
          this.changeLogout = true;
          this.changeAddReceiver = false;
        } 
        else if(val.url === '/reviewPage'){
          this.changeSendMoney = true;
          this.changeMyReceiver = false;
          this.changeLogout = true;
          this.changeAddReceiver = false;
        }
         else {
          this.changeSendMoney = true;
          this.changeMyReceiver = true;
          this.changeLogout = true;
          this.changeAddReceiver = true;
        }
      }
    });
  }
}