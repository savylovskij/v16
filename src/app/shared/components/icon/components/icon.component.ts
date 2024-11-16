import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  input,
  Renderer2,
  SecurityContext,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';

import { IconService } from '../services';

const BASE_PATH = `assets/icons`;

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<ng-content />`,
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    '[attr.data-mat-icon-type]': '"svg"',
    '[attr.data-mat-icon-name]': 'iconName()',
  },
})
export class IconComponent {
  public readonly iconName = input('', {
    transform: (iconName: string) => {
      const [name] = iconName.split('.');

      return name;
    },
  });

  private readonly iconPath = computed(() => {
    if (!this.iconName()) {
      return '';
    }

    const path = `${BASE_PATH}/${this.iconName()}.svg`;
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(path);

    if (!safeUrl) {
      throw new Error(`The URL was not trusted as a resource URL `);
    }

    return <string>(
      this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl)
    );
  });

  constructor(
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
    private readonly destroyRef: DestroyRef,
    private readonly sanitizer: DomSanitizer,
    private readonly iconService: IconService,
  ) {
    effect(() => this.loadIcon());
  }

  private get isIconContent(): boolean {
    return !!this.elementRef.nativeElement.textContent.trim();
  }

  private loadIcon(): void {
    if (this.isIconContent) {
      this.renderer.addClass(this.elementRef.nativeElement, 'custom-icon');

      return;
    }

    if (!this.iconPath()) {
      return;
    }

    const hasIcon = this.iconService.hasIconInCache(this.iconPath());

    if (hasIcon) {
      const cachedSvg = this.iconService.getIconFromCache(this.iconPath());

      this.setSvgElement(cachedSvg);

      return;
    }

    this.fetchAndCacheIcon();
  }

  private fetchAndCacheIcon(): void {
    this.iconService
      .load(this.iconPath())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(svg => {
        this.iconService.setIconToCache(this.iconPath(), svg);

        this.setSvgElement(svg);
      });
  }

  private setSvgElement(svg: SVGElement): void {
    this.clearSvgElement();

    this.elementRef.nativeElement.appendChild(svg);
  }

  private clearSvgElement(): void {
    const layoutElement: HTMLElement = this.elementRef.nativeElement;
    let childCount = layoutElement.childNodes.length;

    while (childCount--) {
      const child = layoutElement.childNodes[childCount];

      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        child.remove();
      }
    }
  }
}
