import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormsModule,FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductsService } from '../../services/product/products.service';
import { LoaderComponent } from '../../partial/loader/loader.component';
import { CartService } from '../../services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { WordLimitModule } from '../../../pipes/word-limit.module';
@Component({
  selector: 'app-accessories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,LoaderComponent,WordLimitModule],
  templateUrl: './accessories.component.html',
  styleUrl: './accessories.component.css',
  providers: [ProductsService,CartService]
})
export class AccessoriesComponent implements OnInit {
  added: boolean = false;
  userId:any;
  stocked: boolean = false;
  productId:any;
  cartForm!: FormGroup;
  total: number = 1;
  isShown: boolean = false;
  isLoad: boolean = false;
  amount:any;
  name: string = "";
  productQuantity: any;
  category = 'accessories';
  productName: any;
  productDescription: any;
  productImg: any;
  productPrice: any;
  quantity = new FormControl(this.total);
  error: boolean = false;
  allconsole: any[] = [];
  console: any [] = [];
  path = "http://127.0.0.1:8000/storage/images/product/";
  constructor(private product:ProductsService,@Inject(PLATFORM_ID) private platformId: Object,private fb: FormBuilder,
              private cart:CartService, private route:Router){}

  ngOnInit(): void {
    this.displayProduct();
    if (isPlatformBrowser(this.platformId)) {
      this.userId = sessionStorage.getItem('Id');
    }
    this.cartForm = this.fb.group({
      user_id: ['', Validators.required],
      item_name: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  displayProduct() {
      this.product.getProduct(this.category).subscribe(
        data =>{
          this.allconsole = data as any[];
          this.filterProducts();
      }) 
  }

  filterProducts() {
    if (this.name.length == 0) {
    this.console = this.allconsole.slice();
  } else {
    this.console = this.allconsole.filter((console) => {
      return console.name.toLowerCase().includes(this.name.toLowerCase());
    });
  }
  }

  showProduct(item:any) {
    this.productId = item.id;
    this.total  = 1;
    this.quantity.setValue(this.total);
    this.productQuantity = item.quantity
    this.isShown = true;
    this.productName = item.name;
    this.productDescription = item.description;
    this.productImg = item.image;
    this.productPrice = item.price;
    this.amount = item.price;
  }

  hideProduct() {
    this.isShown = false;
  }

  add() {
    const delay = 1000;
    if(this.productQuantity-1 < this.total) {
      this.stocked = true;
    } else {
      this.error = false;
      this.isLoad = true;
      const delay = 1000;
      this.total += 1;
      this.quantity.setValue(this.total);
    }
    setTimeout(() => {
      this.amount = this.total * this.productPrice;
      this.isLoad = false;
    }, delay);
  }

  minus() {
    if((this.total - 1) == 0) {
      this.error = true;
    } else {
      this.stocked =false;
      this.isLoad = true;
      const delay = 1000;
      this.total -= 1;
      this.quantity.setValue(this.total);
      setTimeout(() => {
        this.amount = this.total * this.productPrice;
        this.isLoad = false;
      }, delay);
    }
  }
  addCart() {
    if(this.userId == null) {
      this.route.navigateByUrl('/login');
    }else {
      const delay = 3000;
      this.cartForm.get('user_id')?.setValue(this.userId);
      this.cartForm.get('item_name')?.setValue(this.productName);
      this.cartForm.get('quantity')?.setValue(this.total);
      this.cartForm.get('price')?.setValue(this.productPrice);
      this.cartForm.get('image')?.setValue(this.productImg);
      this.cartForm.get('category')?.setValue(this.category);
      this.cart.addCart(this.cartForm.value).subscribe(res =>{
        this.added = true;
        this.hideProduct();
        setTimeout(() => {
          this.added = false;
        }, delay);
      })
    }
  }

  buyNow() {
    if(this.userId == null) {
      this.route.navigateByUrl('/login');
    }else {
      this.cartForm.get('user_id')?.setValue(this.userId);
      this.cartForm.get('item_name')?.setValue(this.productName);
      this.cartForm.get('quantity')?.setValue(this.total);
      this.cartForm.get('price')?.setValue(this.productPrice);
      this.cartForm.get('image')?.setValue(this.productImg);
      this.cartForm.get('category')?.setValue(this.category);
      this.cart.buyNow(this.cartForm.value,this.productId).subscribe(res =>{
        this.added = true;
        this.hideProduct();
          this.route.navigateByUrl('/payment');
      })
    }
  }
}
