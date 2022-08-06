import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import RegisterUser from '../../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public user: RegisterUser = {} as RegisterUser;
  public warning: string = '';
  public success: boolean = false;
  public loading: boolean = false;
  public registerSub: any;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = {
      userName: '',
      password: '',
      password2: '',
    };
  }
  onSubmit(): void {
    this.loading = true;
    if (
      this.user.userName !== '' &&
      this.user.password !== '' &&
      this.user.password2 !== ''
    ) {
      this.registerSub = this.auth.register(this.user).subscribe({
        next: () => {
          this.warning = '';
          this.loading = false;
          this.success = true;
        },
        error: (err) => {
          this.warning = err.error.message;
          this.loading = false;
          this.success = false;
        },
      });
    }
  }
  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
}
