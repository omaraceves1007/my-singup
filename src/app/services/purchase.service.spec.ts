import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PurchaseService } from './purchase.service';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PurchaseService],
    });
    service = TestBed.inject(PurchaseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data', () => {
    const data = {
      items: [{ id: 'email', name: 'Rackspace Email', price: 2, quantity: 20, selected: true }],
      user: {
        firstName: 'omar',
        lastName: 'aceves',
        email: 'omar.acev@gmail.com',
        card: '4112344112344113',
        date: '2022-01-10T08:02:17-05:00',
        ccv: '542',
        bAddress: 'calle 3',
        bCity: 'Mexico',
        bState: 'CDMX',
        bZip: '54789'
      },
      total: 40
    };
    service.purchase(data).subscribe( (resp: any) => {
      expect(resp.data).toBe(data,'Incorrect data');
    });

    const req = httpTestingController.expectOne('/api/post');

    expect(req.request.method).toEqual('POST');

    expect(req.request.body.total).toEqual(data.total);

  });
});
