import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MainFooterComponent } from '../footer/main-footer.component';
import { MainHeaderComponent } from '../header/main-header.component';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, MainFooterComponent, MainHeaderComponent]
})
export class MainLayoutComponent {}
