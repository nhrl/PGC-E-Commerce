import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer/customer.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[CustomerService]
})
export class RegisterComponent {

  constructor (private service: CustomerService, private route:Router) {}
    customer = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      age: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
    })

    submit() {
        this.service.register(this.customer.value).subscribe(
          (res)=>{
            if(res == true) {
              this.route.navigateByUrl('/login');
            }
        })
        
    }
}
