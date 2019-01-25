import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

  getCountByType(type: string) {
    switch (type) {
      case 'crimeservers':
        return this.http.get('assets/test_data/dashboard/widgets/crime_servers_count.json').map(response => response.json());
      case 'malware':
        return this.http.get('assets/test_data/dashboard/widgets/malware_count.json').map(response => response.json());
      case 'bots':
        return this.http.get('assets/test_data/dashboard/widgets/bots_count.json').map(response => response.json());
      case 'credentials':
        return this.http.get('assets/test_data/dashboard/widgets/credentials_count.json').map(response => response.json());
      case 'cards':
        return this.http.get('assets/test_data/dashboard/widgets/credit_cards_count.json').map(response => response.json());
      default:
        return Observable.from([]);
    }
  }

  getGraphDataByType(type: string) {
    switch (type) {
      case 'crimeservers':
        return this.http.get('assets/test_data/dashboard/main_graph/crime_servers_graph.json').map(response => response.json());
      case 'malware':
        return this.http.get('assets/test_data/dashboard/main_graph/malware_graph.json').map(response => response.json());
      case 'bots':
        return this.http.get('assets/test_data/dashboard/main_graph/bots_graph.json').map(response => response.json());
      case 'credentials':
        return this.http.get('assets/test_data/dashboard/main_graph/credentials_graph.json').map(response => response.json());
      case 'cards':
        return this.http.get('assets/test_data/dashboard/main_graph/credit_cards_graph.json').map(response => response.json());
      default:
        return Observable.from([]);
    }
  }
}