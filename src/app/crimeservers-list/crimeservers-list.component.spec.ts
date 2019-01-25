import { Observable } from 'rxjs/Observable';
import { CrimeserversService } from './../services/crimeservers.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/from';

import { CrimeserversListComponent } from './crimeservers-list.component';
import { Router } from '@angular/router';

describe('CrimeserversListComponent', () => {
  let component: CrimeserversListComponent;
  let fixture: ComponentFixture<CrimeserversListComponent>;

  let service: CrimeserversService;
  let componentWithService: CrimeserversListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeserversListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(CrimeserversListComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should set crimeServers property with the items return from the server', () => {
    const router = TestBed.get(Router);
    service = new CrimeserversService(null);
    componentWithService = new CrimeserversListComponent(service, router);

    let fakeList = {
      "data": [
        {
          "attributes": {
            "at_feed": null,
            "at_free_feed": null,
            "bots_count": 0,
            "credentials_count": 0,
            "credit_cards_count": 0,
            "crime_server_url": "http://crime_server_1.com/log-in.pavypal-acc.com/signin",
            "first_seen": "2018-02-05T14:30:18.913843+00:00",
            "is_false_positive": false,
            "last_seen": "2018-02-05T14:30:18.913852+00:00",
            "main_type": "c_and_c",
            "status": "online",
            "subtype_name": "USTEAL",
          },
          "id": "262962",
          "links": {
            "self": "https://mywebsite.com/api/v1/crime-server/262962/"
          },
          "relationships": {
            "fqdn": {
              "data": {
                "id": "1004361",
                "type": "FQDN"
              },
              "links": {
                "related": "https://mywebsite.com/api/v1/fqdn/1004361/"
              }
            }
          },
          "type": "CrimeServer"
        }
      ],
      "links": {
        "first": "https://mywebsite.com/api/v1/crime-server/?page%5Blimit%5D=10",
        "last": "https://mywebsite.com/api/v1/crime-server/?page%5Blimit%5D=10&page%5Boffset%5D=260970",
        "next": "https://mywebsite.com/api/v1/crime-server/?page%5Blimit%5D=10&page%5Boffset%5D=10",
        "prev": null
      },
      "meta": {
        "pagination": {
          "count": 260974,
          "limit": 10,
          "offset": 0
        }
      }
    };
    
    spyOn(service, 'getAll').and.callFake(() => {
      return Observable.from([fakeList]);
    });

    componentWithService.ngOnInit();
    expect(componentWithService.crimeServers.length).toBe(1);
  })
});
