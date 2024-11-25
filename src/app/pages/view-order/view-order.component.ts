import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order/order.service';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.css',
  providers:[OrderService]
})
export class ViewOrderComponent implements OnInit {
  id:any;
  allOrder: any [] = [];
  path = "http://127.0.0.1:8000/storage/images/product/";
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private order:OrderService){}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.id = sessionStorage.getItem('Id');
    }
    this.getOrder();
  }

  getOrder() {
      this.order.getOrder(this.id).subscribe(order => {
        this.allOrder = order as any [];
      })
  }
}
