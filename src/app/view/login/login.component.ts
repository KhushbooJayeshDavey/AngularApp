import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import User from '../../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = {} as User;
  public warning: string = '';
  public loading: boolean = false;
  private loginSub: any;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = {
      userName: '',
      _id: '',
      password: '',
    };
  }
  onSubmit() {
    this.loading = true;
    if (this.user.password !== '' && this.user.userName !== '') {
      this.loginSub = this.auth.login(this.user).subscribe({
        next: (success) => {
          this.loading = false;
          localStorage.setItem('access_token', `${success.token}`);
          this.router.navigate(['/newReleases']);
        },
        error: (err) => {
          this.loading = false;
          this.warning = err.error.message;
        },
      });
    }
  }
}
