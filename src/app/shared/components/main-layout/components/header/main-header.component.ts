import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatToolbarModule, RouterLink]
})
export class MainHeaderComponent {}
