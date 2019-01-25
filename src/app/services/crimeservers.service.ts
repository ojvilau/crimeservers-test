import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CrimeserversService {

  constructor(private http: Http) { }

  getAll(queryObj){
    //queryObj for filtering and pagination
    //
    // return http.get('url?' + toQueryString(queryObj));
    return this.http.get('assets/test_data/crimeserver_list/crime_servers_list.json').map(response => response.json());
  }

  toQueryString(queryObj){
    let queryParams = [];
    for(let key in queryObj)
      if (queryObj[key] !== null && queryObj[key] !== undefined)
        queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(queryObj[key]));
    return queryParams.join('&');
  }

  getDetails(id){
    // return http.get('url?id=' + id);
    return Observable.from([this.fakeDetails]);
  }

  fakeDetails = {
    severity: 'very-high',
    confidence: 85,
    threat_score: 68,
    status: 'Active',
    type: 'URL (Malware URL)',
    indicator: 'http://195.22.126.203/Azorm/',
    ip: '195.22.126.203',
    tags: 'AZORult',
    last_modified: '2017-02-05 04:16:05',
    entries: 1,
    country: 'PL',
    asn: 198414,
    links: {
      nodes: [
        { key: 1, text: "http://195.22.126.203/Azorm/", color: "orange" },
        { key: 2, text: "AZORult", color: "lightblue" },
        { key: 3, text: "195.22.126.203", color: "lightgreen" },
      ],
      relationships: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 3, to: 1 },
      ]
    }
  }
}
