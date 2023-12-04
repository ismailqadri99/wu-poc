import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-page',
  templateUrl: './wallet-page.component.html',
  styleUrls: ['./wallet-page.component.css']
})
export class WalletPageComponent implements OnInit {
 
  isFormSubmitted: boolean=false;
  constructor( private router: Router, private http: HttpClient) { }

  isPhoneNumberValid(value :string): boolean {
    return /^\d{10}$/.test(value);
  }

  isString(value: any): boolean{
    return typeof value === 'string';
  }

  ngOnInit(): void {
  }

  wallet(form: NgForm): void{
    this.isFormSubmitted=true;
    if(form.invalid){
      alert("Please fill all  the required fields");
    }else{
      this.http.post("http://localhost:3001/allData",form.value)
      .subscribe((result)=>{
        console.log("wallet",result);
      this.router.navigateByUrl('/reviewPage');
    })
     }
}
}
