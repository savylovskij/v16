import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
  useFactory: (handler: HttpBackend) => {
    const http = new HttpClient(handler);

    return new IconService(http);
  },
  deps: [HttpBackend],
})
export class IconService {
  private readonly iconCache = new Map<string, Observable<string>>();

  constructor(private readonly http: HttpClient) {}

  public getIcon(url: string): Observable<string> {
    if (!this.iconCache.has(url)) {
      const request = this.fetchIcon(url);

      this.iconCache.set(url, request);
    }

    return this.iconCache.get(url) as Observable<string>;
  }

  private fetchIcon(path: string): Observable<string> {
    return this.http
      .get(path, { responseType: 'text' })
      .pipe(shareReplay({ bufferSize: 1, refCount: false }));
  }
}
