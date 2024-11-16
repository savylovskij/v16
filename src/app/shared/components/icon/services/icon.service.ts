import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IconService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  private readonly cache = new Map<string, SVGElement>();

  public setIconToCache(key: string, svg: SVGElement): void {
    this.cache.set(key, svg);
  }

  public getIconFromCache(key: string): SVGElement {
    return <SVGElement>this.cache.get(key);
  }

  public hasIconInCache(key: string): boolean {
    return this.cache.has(key);
  }

  public load(url: string): Observable<SVGElement> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(svgString => this.svgElementFromString(svgString)),
      catchError(() => throwError(() => new Error('Failed to load icon'))),
    );
  }

  private svgElementFromString(str: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = str as string;
    const svg = div.querySelector('svg') as SVGElement;

    if (!svg) {
      throw Error('<svg> tag not found');
    }

    return this.setSvgAttributes(svg);
  }

  private setSvgAttributes(svg: SVGElement): SVGElement {
    svg.setAttribute('fit', '');
    svg.setAttribute('height', '100%');
    svg.setAttribute('width', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('focusable', 'false');

    return svg;
  }
}
