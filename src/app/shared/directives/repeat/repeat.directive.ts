import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appRepeat]',
  standalone: true,
})
export class RepeatDirective {
  public readonly count = input(0, { alias: 'appRepeat' });

  constructor() {
    effect(() => {
      this.viewContainerRef.clear();

      for (let i = 0; i < this.count(); i++) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }

  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
}
