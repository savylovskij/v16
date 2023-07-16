import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: ``,
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {}
