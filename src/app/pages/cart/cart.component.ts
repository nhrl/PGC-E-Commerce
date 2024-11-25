import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoaderComponent } from '../../partial/loader/loader.component';
import { CartService } from '../../services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Route, Router, RouterModule } from '@angular/router';
import { CommaSeparatedModule } from '../../../pipes/comma-separated.module';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,LoaderComponent,HttpClientModule,RouterModule,CommaSeparatedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers:[CartService],
})
export class CartComponent implements OnInit {
  totalSum = 0;
  id:any;
  deleted: boolean = false;
  itemID:any;
  danger:boolean = false;
  deleteShow:boolean = false;
  isLoad = false;
  quantity = new FormControl();
  cartItem: any [] = [];
  itemName:any;
  path = "http://127.0.0.1:8000/storage/images/product/";
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private cart:CartService,private route:Router){}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.id = sessionStorage.getItem('Id');
    }
    this.getCart();
  }

  getCart() {
      this.cart.getCart(this.id).subscribe(data => {
        this.cartItem = data as any[];
        this.cartItem.forEach(item => this.calculateTotalAmount(item));
        this.calculateTotalSum();
      })
  }

  calculateTotalAmount(item: any) {
    item.totalAmount = item.price * item.quantity;
  }

  calculateTotalSum() {
    this.isLoad = true;
    const delay = 800;
    setTimeout(() => {
      this.totalSum = this.cartItem.reduce((sum, item) => sum + item.totalAmount, 0);
      this.isLoad = false;
    }, delay);
  }

  subtract(item:any) {
    if(item.quantity -1 == 0) {
      this.danger = true;
    } else {
      item.quantity -=1;
      this.calculateTotalAmount(item);
      this.calculateTotalSum();
    }
  }

  Add(item:any) {
    this.danger =false;
    item.quantity += 1;
    this.calculateTotalAmount(item);
    this.calculateTotalSum();
  }

  showMessage(item : any) {
    this.deleteShow = true;
    this.itemID = item.cart_id;
    this.itemName = item.item_name;
  }

  hideMessage() {
    this.deleteShow = false;
  }

  removeItem() {
    const delay = 5000;
    this.cart.deleteItem(this.itemID).subscribe(res => {
      this.hideMessage();
      this.deleted = true;
      setTimeout(() => {
        this.deleted = false;
      }, delay);

      this.ngOnInit();
    })
  }

  update() {
    this.cartItem.forEach((item) => {
      this.cart.payment(item).subscribe(res => {
        console.log(res);
      })
    })
    this.route.navigateByUrl('/payment');
  }
}
