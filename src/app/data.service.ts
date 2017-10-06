import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Customer } from './customers/customer';

@Injectable()
export class DataService {

  private customersUrl = 'customer'; // url to web API
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  // Get all customers
  getCustomers(): Promise<Customer[]> {
    return this.http.get(this.customersUrl)
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError);
  }

  getCustomersByLastName(lastName: string): Promise<Customer[]> {
    const url = '${ this.customersUrl }/${lastName}';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Customer)
      .catch(this.handleError);
  }

  createCustomer(customer: Customer): Promise<Customer> {
    return this.http.post(this.customersUrl, JSON.stringify(customer), { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Customer)
    .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = '${ this.customersUrl }/${ id }';
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // log error eZ
    return Promise.reject(error.message || error);
  }

}
