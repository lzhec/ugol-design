import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as punycode from 'punycode';
import { UserLogin } from 'app/auth/auth.types';
import { SettingsService } from '../api/settings.service';
import { UserModel } from './interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  public loginByPhone(userPhone: number, phoneCode: number) {}

  public loginByUsername(user: UserLogin): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${this.settingsService.apiPath}/site/login`, user)
      .pipe(catchError(() => of(null)));
  }

  public logout() {
    this.router.navigate(['/login']);
  }

  public validate(): Observable<boolean> {
    return of(!!document.cookie.match(new RegExp('(^| )accessToken=([^;]+)')));
  }

  /*phoneCheck(phone) {
    const url = `${ this.url(this.requestUrls.CHECK_PHONE, API_VERSION.V1) }`;
    this.currentPhone.next(phone);
    return this.http.post(url, { phone: phone });
  }

  phoneGetCode(_phone?) {
    const phone = _phone ? _phone : this.currentPhone.value;
    const url = `${ this.url(this.requestUrls.GET_CODE, API_VERSION.V1) }`;
    return this.http.post(url, { phone: phone });
  }

  phoneSignUp(phoneCode, _url?, _phone?) {
    const phone = _phone ? _phone : this.currentPhone.value;
    const url = `${ this.url(this.requestUrls.PHONE_SIGN_UP, API_VERSION.V1) }`;

    return this.http.post(url, { phone: phone, phoneCode: phoneCode, return_url: _url })
        .pipe(
            tap((response: any) => {
              this.updateUserState(response);
              this.analyticsService.track(AUTH_EVENTS.USER_LOGIN, AUTH_EVENTS.USER_LOGIN);
            }),
        );
  }*/
}
