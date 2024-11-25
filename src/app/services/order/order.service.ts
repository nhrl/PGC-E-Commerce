import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  storeOrder($data: any) {
    return this.http.post('http://127.0.0.1:8000/api/order',$data);
  }

  getOrder($id: any) {
    return this.http.get('http://127.0.0.1:8000/api/get-order/'+$id);
  }
}
