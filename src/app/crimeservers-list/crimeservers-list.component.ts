import { CrimeserversService } from './../services/crimeservers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'crimeservers-list',
  templateUrl: './crimeservers-list.component.html',
  styleUrls: ['./crimeservers-list.component.css']
})
export class CrimeserversListComponent implements OnInit {
  crimeServers: Array<CrimeServer>;
  crimeServersTotal: number;

  private readonly PAGE_SIZE = 100;
  // query params to send to the server
  queryObj: any;

  constructor(private crimeserversService: CrimeserversService, private router: Router) {
    this.queryObj = {
      pageSize: this.PAGE_SIZE,
      urlSearch: ''
    };
    this.crimeServersTotal = 1;
  }

  ngOnInit() {
    this.populateCrimeServers();
  }

  // reusable method to fetch the list of crime servers with or without query params
  populateCrimeServers(){
    this.crimeserversService.getAll(this.queryObj).subscribe(response => {
      this.crimeServers = response.data.map(item => {
        return {
          id: item.id,
          seen: item.attributes.last_seen.substr(0, 16).replace('T', ' '),
          url: item.attributes.crime_server_url,
          status: item.attributes.status
        }
      });
      this.crimeServersTotal = response.meta.pagination.count;
    })
  }

  search(urlSearch) {
    this.queryObj.urlSearch = urlSearch
    this.queryObj.page = 1;
    this.populateCrimeServers();
  }

  onPageChange(page){
    this.queryObj.page = page;
    this.populateCrimeServers();
  }
}

interface CrimeServer {
  id;
  seen;
  url;
  status;
}
