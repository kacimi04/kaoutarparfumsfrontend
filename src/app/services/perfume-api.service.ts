import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PerfumeResponseDto } from '../dto/perfume.dto';

@Injectable({
  providedIn: 'root',
})
export class PerfumeApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://kaoutarparfums-1789214036886.azurewebsites.net/api/parfums';

  getAll(countryCode?: string): Observable<PerfumeResponseDto[]> {
    const params = this.buildCountryCodeParams(countryCode);
    return this.http.get<PerfumeResponseDto[]>(this.baseUrl, { params });
  }

  getById(id: string, countryCode?: string): Observable<PerfumeResponseDto> {
    const params = this.buildCountryCodeParams(countryCode);
    return this.http.get<PerfumeResponseDto>(`${this.baseUrl}/${id}`, { params });
  }

  private buildCountryCodeParams(countryCode?: string): HttpParams {
    if (!countryCode) {
      return new HttpParams();
    }

    return new HttpParams().set('countryCode', countryCode);
  }
}
