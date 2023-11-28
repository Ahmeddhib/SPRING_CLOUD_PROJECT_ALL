import { Component } from '@angular/core';
import { BusService } from '../services/bus.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
isLoading:boolean=false;
  constructor(private busService: BusService, private router: Router, private spinner: NgxSpinnerService) {}

  user: User = new User();
  confirmPassword!: string;

  ngOnInit(): void {}

  register() {
    this.isLoading=true;
    const { username, email, password, confirmPassword } = this.form;
    if (password !== confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match';
      this.isSignUpFailed = true;
      return;
    }
    let user = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(user);
    this.busService.ajouterUser(user).subscribe({
      next: (data) => {
        this.isLoading=false;
        console.log(data);
        this.router.navigate(['/verificationcode', { username: user.username }]);
      },
      error: (err) => {
        this.isLoading=false;
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        } else {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        }
      },
    });
  }

  

}
