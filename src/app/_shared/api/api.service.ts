import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  leftPanelData,
  paramsForGettingApartments,
} from '@shared/types/left-panel';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public getListComplexes() {
    return this.http.get(
      'https://api.living.ru/partner-api/complex?cityIds=77,78&realtyType=RESALE', { withCredentials: true }
    );
  }

  public getListApartments(id: string, payload: paramsForGettingApartments) {
    return this.http.post(
      `https://api.living.ru/partner-api/complex/${id}/apartment`,
      payload, { withCredentials: true }
    );
  }

  public getListApartmentLayout(id: string) {
    return this.http.post(
      `https://api.living.ru/partner-api/complex/${id}/planning`,
      { observe: 'response' }, {withCredentials: true}
    );
  }

  public sendApartmentSettings(params: any) {
    return this.http.post('/api//v2/client/configurator/save-params', params);
  }

  public getLeftPanelData(): Observable<leftPanelData> {
    return this.http.get<leftPanelData>(
      '/api/v2/client/configurator/get-side'
    );
  }
}
