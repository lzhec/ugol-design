import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageConstants } from '@shared/constants/local-storage-constants';

@Injectable()
export class ConfiguratorInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        [LocalStorageConstants.TokenHeader]: `${
          localStorage.getItem(LocalStorageConstants.Token) || ''
        }`,
      },
    });

    return next.handle(request);
  }
}
