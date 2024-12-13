import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  SecurityContext,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { catchError, throwError } from 'rxjs';

import { IconService } from '../../services';
import { isEmptyString } from '../../../../utils';

function assertValidUrl(url: unknown): void | never {
  if (isEmptyString(url)) {
    throw new Error('The URL is required');
  }
}

/**
 * The `IconComponent` is designed to display SVG icons dynamically.
 * It utilizes Angular's capabilities to securely load and manage SVG resources.
 *
 * ### Example Usage:
 * ```html
 * <app-icon src="assets/images/icons/book.svg" />
 * ```
 *
 * #### Inputs:
 * - `src`: A required input specifying the path to the SVG file.
 *
 * #### Features:
 * - Ensures secure loading of SVG resources using Angular's `DomSanitizer`.
 * - Caches icons to optimize performance and reduce redundant network requests.
 *
 * #### Notes:
 * - The `src` input must point to a valid and accessible SVG file.
 * - If the URL is not trusted or sanitized, an error will be thrown.
 */

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
  },
})
export class IconComponent {
  public readonly url = input('', {
    transform: (src: string) => {
      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);

      if (!safeUrl) {
        throw new Error(`The URL was not trusted as a resource URL `);
      }

      return this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
    },
    alias: 'src',
  });

  private readonly element = inject(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly iconService = inject(IconService);

  constructor() {
    effect(() => {
      const url = this.url();

      assertValidUrl(url);

      if (url) {
        this.configureIcon(url);
      }
    });
  }

  private configureIcon(url: string): void {
    this.iconService
      .getIcon(url)
      .pipe(
        catchError(err =>
          throwError(() => new Error(`Failed to load icon: ${err.message}`)),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(svgString => this.renderIcon(svgString));
  }

  private renderIcon(svgString: string): void {
    const svgElement = this.svgElementFromString(svgString);

    this.clearSvgElement();

    this.element.appendChild(svgElement);
  }

  private clearSvgElement(): void {
    let childCount = this.element.childNodes.length;

    while (childCount--) {
      const child = this.element.childNodes[childCount];

      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        child.remove();
      }
    }
  }

  private svgElementFromString(svgString: string): SVGElement {
    const div = this.document.createElement('div');
    div.innerHTML = svgString;
    const svg = div.querySelector('svg');

    if (!svg) {
      throw new Error('<svg> tag not found');
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
