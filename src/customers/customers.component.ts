import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../customer.service";
import {Customer} from "../customer.model";
import {ErrorResponse} from "../error-response";
import {SearchCriteria} from "../search-criteria";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = []; // Initialize customers array
  searchID: number = 0 ; // Initialize search term
  searchFirstName: string = ""; // Initialize search term
  searchLastName: string = ""; // Initialize search term
  searchEmail: string = ""; // Initialize search term
  err = {} as ErrorResponse ;
  constructor(private customerService : CustomerService) { }
  customer = {} as SearchCriteria  ;

  ngOnInit(): void {
      //
      // this.customerService.getALL().subscribe((data:Customer[])=>{
      //     console.warn(data);
      //   this.customers = data
      //
      // }) ;

  }


  save(data: Customer){
     console.warn(data);
    this.customerService.addCustomer(data)
  }

  searchCustomers() {
    this.customer.customerId = this.searchID;
    this.customer.firstName = this.searchFirstName;
    this.customer.lastName = this.searchLastName;
    this.customer.email = this.searchEmail;

    console.warn(this.customer);
    this.customerService.search(this.customer).subscribe(
      (data : Customer[] | ErrorResponse) =>{
        console.log(data);
        // if('customerId' in data){
        // if(Array.isArray(data)){
        //     this.customers = data ;
        //     this.err = {} as ErrorResponse ;
        //
        // }else if('code' in data){
        //
        //    this.customers = [];
        //    this.err=data
        // }


        // this.customers = Array.isArray(data) ? data : [];
        // this.err = Array.isArray(data) ? {} as ErrorResponse : data;

        Array.isArray(data) && (this.customers = data) && (this.err = {} as ErrorResponse);

        !Array.isArray(data) && (Object.keys(data).find(key => key === 'code')) && (this.customers = []) && (this.err = data);



      }

    )

  }


}
