import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
  providers:[CustomerService]
})
export class EditProfileComponent implements OnInit {
  customerInfo: any = [];
  successMessage: any;
  success: boolean = false;
  file:any;
  id:any;
  path = "http://127.0.0.1:8000/storage/images/customer/";
  constructor (@Inject(PLATFORM_ID) private platformId: Object,private customer:CustomerService){}

  ngOnInit(): void {
    this.getuser();
  }

  getuser() {
    if (isPlatformBrowser(this.platformId)) {
        this.id = sessionStorage.getItem('Id');
        if(this.id !== undefined) {
          this.customer.getCustomerInfo(this.id).subscribe(data => {
            this.customerInfo = data;
          })
        }
      }
    }

    imageUpload(event: any) {
      this.file = event.target.files[0];
    }

    updateProfile() {
      const delay = 2000;
      const formData = new FormData();
      formData.append('first_name',this.customerInfo.first_name);
      formData.append('last_name',this.customerInfo.last_name);
      formData.append('age',this.customerInfo.age);
      formData.append('address',this.customerInfo.address);
      formData.append('profile',this.file);
      this.customer.editProfile(formData,this.id).subscribe(res => {
        this.successMessage = res;
        this.success = true;
        this.ngOnInit();
        setTimeout(() => {
          this.success = false;
        }, delay);
      })
    }
}
