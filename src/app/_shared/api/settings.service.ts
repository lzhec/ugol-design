import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _apiPath: string;
  private _frontPath: string;

  constructor() {
    this._apiPath = `${location.origin}${environment.apiPath}`;
    this._frontPath = location.origin;
  }

  public get apiPath(): string {
    return this._apiPath;
  }

  public get frontPath(): string {
    return this._frontPath;
  }

  public get version(): string {
    return localStorage.getItem('version');
  }

  public set version(value: string) {
    localStorage.setItem('version', value);
  }
}
