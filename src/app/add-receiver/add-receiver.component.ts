import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Service/data/data.service';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.css']
})
export class AddReceiverComponent implements OnInit{

  selectedCountry: string;
  countryData: any = {};
  countries: any = [];
  receiverList: Array<Object> = [];
  countryCodes: any ={};
  isDropdownOpen: boolean = false;
  isFormSubmitted=false;
  CodeField: any;
  
  constructor(private router: Router, private http: HttpClient, private data: DataService) { }

  isPhoneNumberValid(value :string): boolean {
    return /^\d{10}$/.test(value);
  }

  isString(value: any): boolean{
    return typeof value === 'string';
  }
  OnClick(form: NgForm): void {
    this.isFormSubmitted=true;
    if(form.invalid 
      // ||  !this.isPhoneNumberValid(form.value.phone)
    ){
      alert("Please fill all the details");
    }
    else{
      this.addReceiver(form.value);
    }
  }
  addReceiver(user: any){

    console.log(user);
      this.http.post("http://localhost:3000/CurrentData",user)
          .subscribe((result)=>{
            console.log(result);
            alert("Receiver data added");
            this.router.navigateByUrl('/myReceiver');
          })
}

isReqMidName(): boolean {
  const midname = this.countryData[0][this.selectedCountry];
  return midname ? midname.isReqMidName : false;

}

isReqLastName(): boolean {
  const lastname = this.countryData[0][this.selectedCountry];
  return lastname ? lastname.isReqLastName : false;
}
 
ngOnInit(): void {
  forkJoin({
    allCountryDetails: this.data.getConfig(),
    receivers: this.data.getReceivers()
  }).subscribe({
    next: (results: { allCountryDetails: Array<Object>, receivers: Array<Object> }) => {
      this.countryData = results.allCountryDetails;
      this.countries = Object.keys(this.countryData[0]);
      this.receiverList = results.receivers;
      console.log("Receiver List:", this.receiverList);
    }
  });
}
CountryCode(): void {
  const selectedCountryData = this.countryData.find(country => country[this.selectedCountry]);
  if (selectedCountryData) {
    this.countryCodes = selectedCountryData[this.selectedCountry];
  }
}

getFlag(name: string): string {
  const selectedCountryData = this.countryData.find((country) => country[name]);
  if (selectedCountryData && selectedCountryData[name]) {
    return selectedCountryData[name].flag || "";
  }
}
Dropdown(): void {
  this.isDropdownOpen = !this.isDropdownOpen;
}
}
