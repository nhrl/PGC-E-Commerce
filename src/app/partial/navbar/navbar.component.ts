import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MainComponent } from '../../pages/main/main.component';
import { filter } from 'rxjs';
import { CustomerService } from '../../services/customer/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule,MainComponent,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers:[CustomerService]
})
export class NavbarComponent implements OnInit{
  id: any;
  user: any;
  _router: any | undefined;
  showCart: boolean = false;
  isLogin:boolean = false;
  profile:boolean = false;
  path = "http://127.0.0.1:8000/storage/images/customer/";
  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object, private service:CustomerService){
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
          .subscribe((event: { url: any; }) => 
           {
              this._router = event.url;      
           });
    }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    if (isPlatformBrowser(this.platformId)) {
      this.id = sessionStorage.getItem('Id');
    }
    if(this.id != undefined) {
      this.showCart = true;
      this.isLogin = true;
      this.profile = true;
      this.getUser();
    }else {
      this.isLogin = false;
      this.showCart = false;
      this.profile = false;
    }
  }

  getUser() {
      if(this.id !== undefined) {
        this.service.getCustomerInfo(this.id).subscribe(
          data => {
            this.user = data;
        })
      }
  }
  showDiv: boolean = false;
  show() {
    if(this.showDiv == false) {
      this.showDiv = true;
    } else {
      this.showDiv = false;
    }
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
    this.ngOnInit();
  }
}
