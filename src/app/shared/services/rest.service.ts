import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class RestService {
  protected readonly http = inject(HttpClient);
  protected readonly apiUrl = environment.url;
}
