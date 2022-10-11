import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {MySessionService} from '../my-session.service';
import {Subject, switchMap, takeUntil} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 100%;
        padding: 1rem;
      }

      :host ::ng-deep .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }

      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm!: FormGroup;
  private ngUnsubsribe = new Subject();
  isLoading: boolean = false;

  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private sessionService: MySessionService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(
        switchMap((res) => {
          if (res) {
            localStorage.setItem('jwt_token', res?.data);
          }
          return this.authService.getUserInfo();
        }),
        takeUntil(this.ngUnsubsribe)
      )
      .subscribe((res) => {
        if (res) {
          this.sessionService.createSession(res);
          this.route.navigate(['']);
        }
      });
  }
}
