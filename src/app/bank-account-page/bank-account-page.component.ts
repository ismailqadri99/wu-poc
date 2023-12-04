import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bank-account-page',
  templateUrl: './bank-account-page.component.html',
  styleUrls: ['./bank-account-page.component.css']
})
export class BankAccountPageComponent implements OnInit {

isFormSubmitted: boolean = false;
selectedCountry: string;
  countryData: any = {};
  countries: any = [];
  receiverList: Array<Object> = [];
  countryCodes: any ={};
  ReAccountNo: any;
  accountNo: any;

  constructor(private router: Router, private http: HttpClient) { }

  isPhoneNumberValid(value :string): boolean {
    return /^\d{10}$/.test(value);
  }

  isString(value: any): boolean{
    return typeof value === 'string';
  }

  ngOnInit(): void {
    
  }
  
 
  bank(form: NgForm) : void{
    this.isFormSubmitted=true;
    if(form.invalid){
      alert("Please fill all  the required fields");
    } else if(form.value.accountNo !== form.value.ReAccountNo){
      alert("Account numbers do not match. Please enter the correct Account number!");
      console.log("valuw", form.value.accountNo !== form.value.ReAccountNo);
    }
      else{
      this.http.post("http://localhost:3001/allData",form.value)
      .subscribe((result)=>{
        console.log("bank",result);
        this.router.navigateByUrl('/reviewPage');
  })
}
}
}