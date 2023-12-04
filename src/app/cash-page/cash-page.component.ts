import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../Service/data/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cash-page',
  templateUrl: './cash-page.component.html',
  styleUrls: ['./cash-page.component.css']
})
export class CashPageComponent implements OnInit {

  firstName: string='';
  lastName: string='';
  middleName: string=''
isFormSubmitted: boolean=false;
form: NgForm;
  
  constructor(private router: Router, private http: HttpClient) {  }

  isPhoneNumberValid(value :string): boolean {
    return /^\d{10}$/.test(value);
  }

  isString(value: any): boolean{
    return typeof value === 'string';
  }

  cash(form: NgForm): void{
    this.isFormSubmitted=true;

    if(form.invalid){
      console.log(form.value);
      alert("Please fill all  the required fields");
    }else{
      this.http.post("http://localhost:3001/allData",form.value)
      .subscribe((result)=>{
        console.log("cash",result);
      this.router.navigateByUrl('/reviewPage');
    })
     }
    }
    
  ngOnInit(): void {
  }
}

