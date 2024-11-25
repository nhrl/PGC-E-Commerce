import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = "http://127.0.0.1:8000/api";

  constructor(private http:HttpClient) { }



  addCart($data:any) {
    return this.http.post('http://127.0.0.1:8000/api/add-cart',$data);
  }

  getCart($id : any) {
    return this.http.get('http://127.0.0.1:8000/api/cart-item/'+$id);
  }

  deleteItem($id : any) {
    return this.http.delete('http://127.0.0.1:8000/api/remove-item/'+$id);
  }

  deleteAllData(): Observable<any> {
    const url = `${this.apiUrl}/delete-all-data`;
    return this.http.get(url);
  }

  buyNow($data:any, $productId:any) {
    return this.http.post('http://127.0.0.1:8000/api/buy-now/'+$productId,$data);
  }

  payment($data:any) {
    return this.http.put('http://127.0.0.1:8000/api/proceed-payment',$data);
  }
}
