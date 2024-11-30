import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { IconService } from './icon.service';

describe('IconService', () => {
  let service: IconService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), IconService],
    });

    service = TestBed.inject(IconService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and cache an icon on the first request', async () => {
    const iconUrl = 'test-icon.svg';
    const mockIconData = '<svg>Mock Icon</svg>';

    const spyFetchIcon = jest.spyOn<IconService, any>(service, 'fetchIcon');

    service.getIcon(iconUrl).subscribe(icon => {
      expect(icon).toBe(mockIconData);
    });

    const req = httpMock.expectOne(iconUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockIconData);

    expect(spyFetchIcon).toHaveBeenCalledTimes(1);

    service.getIcon(iconUrl).subscribe(icon => {
      expect(icon).toBe(mockIconData);
    });

    expect(spyFetchIcon).toHaveBeenCalledTimes(1);

    httpMock.expectNone(iconUrl);
  });

  it('should not cache new requests for different icons', done => {
    const firstIconUrl = 'firstIcon.svg';
    const secondIconUrl = 'secondIcon.svg';

    const firstMockIconData = '<svg>Mock first icon</svg>';
    const secondMockIconData = '<svg>Mock second icon</svg>';

    service.getIcon(firstIconUrl).subscribe(icon => {
      expect(icon).toBe(firstMockIconData);
    });

    const firstRequest = httpMock.expectOne(firstIconUrl);
    expect(firstRequest.request.method).toBe('GET');
    firstRequest.flush(firstMockIconData);

    service.getIcon(secondIconUrl).subscribe(icon => {
      expect(icon).toBe(secondMockIconData);
      done();
    });

    const secondRequest = httpMock.expectOne(secondIconUrl);
    expect(secondRequest.request.method).toBe('GET');
    secondRequest.flush(secondMockIconData);
  });
});
