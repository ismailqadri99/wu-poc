import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url='http://localhost:3000/CurrentData';
  configurl="http://localhost:3000/country";
  sendUrl="http://localhost:3001/sendMoney";
  allUrl="http://localhost:3001/allData"
  // bankUrl="http://localhost:3001/BankForm";
  // walletUrl="http://localhost:3001/walletData"

  sharedData: any= {};
  private buttonName:string;

  constructor( private http: HttpClient) { }


  getReceivers(){
    console.log("receivers list");
    return this.http.get(this.url)
  }
  getAllData(){
    return this.http.get(this.url);
  }

  deleteReceiver(Id:number){
    return this.http.delete(`${this.url}/${Id}`)
  }

  getReceiverId(Id:number){
    return this.http.get(`${this.url}/${Id}`);
  }

  updateReceiverId(Id: number, res: any){
    return this.http.put(`${this.url}/${Id}`, res)
  }

  getConfig(){
    return this.http.get(this.configurl);
  }

   setButtonName(name:string){
   this.buttonName=name;
  }

   getButtonName(){
    return this.buttonName;
  }

   getSendMoney(){
    return this.http.get<any[]>(this.sendUrl);
   }
   getCashDetails(){
    return this.http.get<any[]>(this.allUrl);
   }
  //  getBankDetails(){
  //   return this.http.get(this.bankUrl);
  //  }
  //  getWalletDetails(){
  //   return this.http.get(this.walletUrl);
  //  }

  //  getCurrentData() {
  //   return this.http.get<any[]>(this.cashUrl);
  // }

  //  getsendMoney() {
  //   return this.http.get<any[]>(this.sendUrl);
  // }
}
