import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { IconService } from '../../services';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let sanitizer: jest.Mocked<DomSanitizer>;
  let iconService: jest.Mocked<IconService>;
  let documentMock: Document;
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;

  beforeEach(() => {
    sanitizer = {
      bypassSecurityTrustResourceUrl: jest.fn(),
      sanitize: jest.fn(),
    } as unknown as jest.Mocked<DomSanitizer>;

    iconService = {
      getIcon: jest.fn(),
    } as unknown as jest.Mocked<IconService>;

    documentMock = document;

    TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: [
        { provide: DomSanitizer, useValue: sanitizer },
        { provide: IconService, useValue: iconService },
        { provide: DOCUMENT, useValue: documentMock },
      ],
    });

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
