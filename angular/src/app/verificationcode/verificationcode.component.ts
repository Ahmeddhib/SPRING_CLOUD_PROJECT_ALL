import { Component } from '@angular/core';
import { BusService } from '../services/bus.service';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verificationcode',
  templateUrl: './verificationcode.component.html',
  styleUrls: ['./verificationcode.component.css']
})
export class VerificationcodeComponent {
  
  verificationCode!: string; // Using ! to indicate it will be initialized later
  username!: string;
  isLoading: boolean = false;
  msg="";
  constructor(private busService: BusService, private  routerr : ActivatedRoute, private router: Router) {
    this.username=this.routerr.snapshot.paramMap.get('username')!;
    console.log(this.routerr.snapshot.paramMap.get('username'))
  }

  activateUser(username: string, verificationCode: string) {
    this.isLoading = true;
    this.busService.activateUser(username, verificationCode).subscribe(
      (user) => {
        if (user != null) {
          console.log('User activated successfully:', user);
          this.router.navigate(['/login']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Activation Error',
            text: 'User activation failed: Please chek you email to enter the correct verification code ',
          });
        }
      },
      (error) => {
        console.error('User activation failed:   ', error);
      }
    ).add(() => {
      this.isLoading = false;
    });
  }
  
}
