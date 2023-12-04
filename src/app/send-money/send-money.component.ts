import { Component, OnInit } from "@angular/core";
import { DataService } from "../Service/data/data.service";
import { HttpClient } from "@angular/common/http";
import { forkJoin } from "rxjs";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthGaurdService } from "../Service/auth/auth.service";

@Component({
  selector: "app-send-money",
  templateUrl: "./send-money.component.html",
  styleUrls: ["./send-money.component.css"],
})
export class SendMoneyComponent implements OnInit {
  selectedCountry: string;
  countryData: Array<Object> = [];
  countries: string[] = [];
  receiverList: Array<Object> = [];
  countryValue: any = {};
  usdAmount: number;

  country: any = {};
  exchangeValue: number;
  ReceiverAmount: number;
  SconvertedAmount: number;
  RconvertedAmount: number;
  Value: any;
  countryCodes: any;
  currency: any;
  RecieverMoney: number;
  cashButton: number = 0;
  isSendClick: boolean = false;
  isReceiveClick: boolean = false;
  isDropdownOpen: boolean = false;
  payCashButton: string;
  countryFlag: any;
  getFlagcountry: any;
  selectedCountryInfo: any;
  flag: any;
  total: any;
  recieverPayButtonName: string;
  recieverPayButton: number=0;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router,
    private auth: AuthGaurdService
  ) {}

  Dropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  fetchExchangeValue(country: string): void {
    this.selectedCountry = country;
    const getCountry = this.countryData.find((c) => c[this.selectedCountry]);

    if (getCountry) {
      this.exchangeValue = getCountry[this.selectedCountry].exchangeValue;
      this.currency = getCountry[this.selectedCountry].currency;
      this.flag= getCountry[this.selectedCountry].flag;
      console.log("currency",this.currency);
      console.log("flag", this.flag);
      console.log("exchnageValue", this.exchangeValue);
    }
    this.usdAmount = null;
    this.RecieverMoney = null;
  }

sendMoney(user: any) {
  user.selectedCountry = this.selectedCountry;
  user.recieverPayButton = this.recieverPayButtonName;
  user.cashButton = this.payCashButton;
  user.exchangeValue= this.exchangeValue;
  user.currency= this.currency;
  user.flag=this.flag;
  user.total=this.total;

  
  console.log("total", this.total)
  if (this.usdAmount) {
    user.sendAmount = this.usdAmount;
    if (this.exchangeValue) {
       user.receiveAmount = this.usdAmount * this.exchangeValue;
       this.total= this.usdAmount + 3.24;
    }
    
  }
  if (this.RecieverMoney) {
    user.receiveAmount = this.RecieverMoney;
    if (this.exchangeValue) {
      user.sendAmount = this.RecieverMoney / this.exchangeValue;
    }
    } 
  
  if (this.auth.LoggedIn()){
    this.http.post('http://localhost:3001/sendMoney', user).subscribe(
    (result) => {
      console.log(result);
    }
  );
  this.navigateToNextPage();
  }
  else {
    this.router.navigateByUrl("/");
  }
}

  SendCurrencyConverter() {
    this.SconvertedAmount = this.usdAmount? this.usdAmount * this.exchangeValue: 0;
    console.log(this.SconvertedAmount);
    this.isSendClick = Boolean(this.usdAmount);
  }
  ReceiverCurrencyConverter() {
    this.RconvertedAmount = this.RecieverMoney? this.RecieverMoney / this.exchangeValue: 0;
    console.log(this.RconvertedAmount);
    this.isReceiveClick = Boolean(this.RecieverMoney);
  }

  selectButton(buttonNumber: number, buttonName: string) {
    this.recieverPayButton = buttonNumber;
    this.recieverPayButtonName = buttonName;
    console.log("SAD", this.recieverPayButton);
    console.log("SAD", this.recieverPayButtonName);
  }

  cashSelectButton(num: number, payCash: string) {
    this.cashButton = num;
    this.payCashButton = payCash;
    console.log(this.payCashButton);
  }

  navigateToNextPage() {
    // if (this.auth.LoggedIn()) {
      if (this.recieverPayButton == 1) {
        this.router.navigate(["/cashPage"]);
      }
      if (this.recieverPayButton == 2) {
        this.router.navigate(["/bankPage"]);
      }
      if (this.recieverPayButton == 3) {
        this.router.navigate(["/walletPage"]);
      }
      if (this.recieverPayButton == 0) {
        alert("Please fill all the details");
      }
    //  else {
    //   this.router.navigateByUrl("/");
    // }
  }

  getFlag(name: string): string {
    const getFlagcountry = this.countryData.find((c) => c[name]);
    console.log("flag",name);
    if (getFlagcountry && getFlagcountry[name]) {
      return getFlagcountry[name].flag || "";
    }
  }

  ngOnInit(): void {
    this.data.getConfig().subscribe({
      next: (allCountryDetails: Array<Object>) => {
        this.countryData = allCountryDetails;
        console.log("co", this.countryData);
        this.countries = Object.keys(allCountryDetails[0]);
        console.log("countries", this.countries);
      },
    });
  }
}
