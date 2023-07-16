import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-posts-layout',
  standalone: true,
  templateUrl: './posts-layout.component.html',
  styleUrls: ['./posts-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsLayoutComponent {}
