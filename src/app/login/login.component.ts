import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
//test
  loginData ={ username: '', password: '' };

  loginForm!: FormGroup;

  isLoading: boolean = false;

  constructor(public fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;
      this.auth.login(username, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login successful', response);
          localStorage.setItem('auth_token', response.token);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error during login', err);
        }
      });
    }
  }
  
}
