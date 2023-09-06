import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@shared/authentication/authentication.service';
import { FormGroupByType } from '@shared/types/form';
import { UserLogin } from './auth.types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public form = new FormGroup<FormGroupByType<Partial<UserLogin>>>({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthenticationService) {}

  public login(): void {
    const formData = {
      ...this.form.value,
      from: 'market',
      type: 'market',
    } as UserLogin;

    this.authService
      .loginByUsername(formData)
      .subscribe((res) => console.log(res));
  }
}
