import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }


  register($data : any) {
    return this.http.post('http://127.0.0.1:8000/api/add-customer', $data);
  }

  login($data : any) {
    return this.http.post('http://127.0.0.1:8000/api/login-customer',$data);
  }

  getCustomerInfo($id : any) {
    return this.http.get('http://127.0.0.1:8000/api/customer/'+$id);
  }

  editProfile($data : any, $id : any) {
    return this.http.post('http://127.0.0.1:8000/api/edit-customer-profile/'+$id, $data);
  }
}
