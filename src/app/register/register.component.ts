import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { userRequest } from '../domain/userRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: userRequest = {username: '', password: ''};
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (password!!.value !== confirmPassword!!.value) {
      confirmPassword!!.setErrors({ passwordMismatch: true });
      console.log("mismatch");
      return { passwordMismatch: true };
    } else {
      confirmPassword!!.setErrors(null);
      return null;
    }
  }
  

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  
    const user = {
      username: this.registerForm.controls['username'].value,
      password: this.registerForm.controls['password'].value
    };
  
    this.userService.register(user).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login']);
    }, error => {
      this.registerForm.controls['username'].setErrors({ usernameExists: true });
      console.log(error);
      // show error message
    });
  }
  
}  
