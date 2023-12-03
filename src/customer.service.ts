import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "./customer.model";
import {Observable, switchMap, tap} from "rxjs";
import {SearchCriteria} from "./search-criteria";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http : HttpClient) { }
  public url2 : any
  public url3 : any
  public  apis : string = '../assets/apis.json';
  path : string ='';


  addCustomer(data: Customer) {
    this._http.get(this.apis).subscribe(response => {
      this.url2 = response;
      console.log(this.url2[0]["url"]);

      this._http.post(this.url2[0]["url"], data).subscribe(result => {
        console.warn("result: ", result);
      });
    });
  }


  getALL(): Observable<Customer[]> {
    return this._http.get(this.apis).pipe(
      tap(response => {
        this.url3 = response;
        console.log(this.url3[2]["url"]);
        //let p = this.url3[2]["url"];
        // this._http.get<any>(p).subscribe((data: Customer[]) => {
        //   console.warn(data);
        // });
      }),
      switchMap(response => {
        let p = this.url3[2]["url"];
        return this._http.get<any>(p);
      })
    );
  }



  search(searchCriteria: SearchCriteria): Observable<any> {
    return this._http.get<any[]>(this.apis).pipe(
      switchMap((response: any[]) => {
        this.url2 = response;
        console.log(this.url2[1]["url"]);

        return this._http.post(this.url2[1]["url"], searchCriteria);
      })
    );
  }




}
