import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../Service/data/data.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  reviewPage: any;
  cashReviewPage:any;
  mergedData: any[];
  total: any;
  usdAmount: any;

  constructor(private data: DataService, private http: HttpClient) { }

  ngOnInit(){
    this.data.getSendMoney().subscribe((Review)=>{
      this.data.getCashDetails().subscribe((cashReview =>{
        this.cashReviewPage=cashReview;
        console.log("a",cashReview);  
        console.log("b",Review);
        this.reviewPage=Review;
   
        this.mergeData()
        console.log(this.mergeData());
    }))
    })
  }   

  mergeData(){
    const sendMoney = this.data.getSendMoney();
    const allData = this.data.getCashDetails();
 
    forkJoin([sendMoney, allData]).subscribe(([sendMoney, allData]) => {
      this.mergedData = sendMoney.map(item1 => {
        const item2 = allData.find(item2 => item2.id === item1.id);
        console.log("all",item1);
        console.log("merge", { ...item1, ...item2 });
        return { ...item1, ...item2 };
      });
    });
  }
}
