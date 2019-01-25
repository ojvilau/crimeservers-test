import { DashboardService } from "./../services/dashboard.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  // array of widgets, this could be fetched from server also
  widgetsArr = [
    { name: "crimeservers", count: 0 },
    { name: "malware", count: 0 },
    { name: "bots", count: 0 },
    { name: "credentials", count: 0 },
    { name: "cards", count: 0 }
  ];
  selectedWidget: string;

  // initial configuration of the chart
  lineChartData:Array<any> = [ {data: [] } ];
  lineChartLabels:Array<any> = [];
  lineChartOptions:any = { responsive: true };
  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend:boolean = false;
  lineChartType:string = 'line';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    // fetching widget data by type
    this.widgetsArr.forEach(item => {
      this.dashboardService.getCountByType(item.name).subscribe(response => {
        item.count = response.data[0].attributes.count;
      })
    });

    // initial selected widget
    this.changeSelectedWidget(this.widgetsArr[0].name);
  }


  changeSelectedWidget(eventArgs){
    // changing clicked widget to visually apply a darker background
    this.selectedWidget = eventArgs;

    this.dashboardService.getGraphDataByType(eventArgs).subscribe(response => {
      // filling chart columns
      this.lineChartLabels = response.data.map(item => {
        return item.id;
      });
      // filling chart data
      this.lineChartData[0].data = response.data.map(item => {
        return item.attributes.count;
      });
    })
  }  
}
