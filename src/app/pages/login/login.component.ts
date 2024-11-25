import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[CustomerService]
})
export class LoginComponent {
  userInvalid:boolean = false;
  constructor(private service: CustomerService, private router:Router){}
  customer = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })


  submit() {
    this.service.login(this.customer.value).subscribe(res =>{
      if(res == "unathorized") {
        this.userInvalid = true;
        this.customer.patchValue({
          username: '',
          password: '',
        })
        setTimeout(() => {
          this.userInvalid = false;
        },2000)
      } else {
        sessionStorage.setItem('Id', JSON.stringify(res));
        this.router.navigateByUrl('shop/console');
      }
    })
  }
}
