import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { LoaderComponent } from '../../partial/loader/loader.component';
import { CartService } from '../../services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Route, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { OrderService } from '../../services/order/order.service';
import { CommaSeparatedModule } from '../../../pipes/comma-separated.module';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,LoaderComponent,HttpClientModule,RouterModule,CommaSeparatedModule,LoaderComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  providers:[CartService,CustomerService,OrderService]
})
export class PaymentComponent implements OnInit {
  orderForm!: FormGroup;
  isLoad: boolean = false;
  id:any;
  totalSum = 0;
  cartItem: any [] = [];
  User:any;
  fullName: any;
  userName: any;
  userLast:any;
  userAddress:any;
  path = "http://127.0.0.1:8000/storage/images/product/";

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private cart:CartService, private customer:CustomerService,private fb: FormBuilder,
              private order:OrderService, private route:Router){}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.id = sessionStorage.getItem('Id');
    }
    this.getCart();
    this.getUser();
    this.orderForm = this.fb.group({
      user_id: ['', Validators.required],
      customer_name: ['', Validators.required],
      customer_address: ['', Validators.required],
      item_name: ['', Validators.required],
      quantity: [0, Validators.required],
      total: [0, Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  getUser() {
    this.customer.getCustomerInfo(this.id).subscribe(data => {
       this.User = data; 
        this.userName = this.User.first_name;
        this.userLast = this.User.last_name;
        this.userAddress = this.User.address;
    })
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
    const delay = 2000;
    setTimeout(() => {
      this.totalSum = this.cartItem.reduce((sum, item) => sum + item.totalAmount, 0);
      this.isLoad = false;
    }, delay);
  }

  payItem() {
    this.cartItem.forEach(item => this.submit(item));
    this.cart.deleteAllData().subscribe(res => {
      this.route.navigateByUrl('/success');
    })
  }

  submit(item : any) {
    this.fullName = this.userName + ' ' + this.userLast;
    this.calculateTotalAmount(item);
    this.orderForm.get('user_id')?.setValue(this.id);
    this.orderForm.get('customer_name')?.setValue(this.fullName);
    this.orderForm.get('customer_address')?.setValue(this.userAddress);
    this.orderForm.get('item_name')?.setValue(item.item_name);
    this.orderForm.get('quantity')?.setValue(item.quantity);
    this.orderForm.get('total')?.setValue(item.totalAmount);
    this.orderForm.get('image')?.setValue(item.image);
    this.orderForm.get('category')?.setValue(item.category);
    this.order.storeOrder(this.orderForm.value).subscribe(res => {
      console.log(res);
    });
  }
}
