import { CrimeserversService } from './../services/crimeservers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as go from 'gojs';

@Component({
  selector: 'crimeserver-details',
  templateUrl: './crimeserver-details.component.html',
  styleUrls: ['./crimeserver-details.component.css']
})
export class CrimeserverDetailsComponent implements OnInit {
  crimeServerDetails;
  myDiagram;

  constructor(private route: ActivatedRoute, private crimeserversService: CrimeserversService) {
    this.crimeServerDetails = {
      severity: '',
      confidence: '',
      threat_score: '',
      status: '',
      type: '',
      indicator: '',
      ip: '',
      tags: '',
      last_modified: '',
      entries: '',
      country: '',
      asn: '',
      links: {
        nodes: [],
        relationships: []
      }
    }
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.crimeserversService.getDetails(id)
      .subscribe(data => {
        this.crimeServerDetails = data;
        console.log(this.crimeServerDetails);

        this.buildDiagram(new go.GraphLinksModel(this.crimeServerDetails.links.nodes, this.crimeServerDetails.links.relationships));
      });
  }

  buildDiagram(model) {
    var $ = go.GraphObject.make;
    this.myDiagram = $(go.Diagram, "myDiagramDiv");

    this.myDiagram.nodeTemplate =
      $(go.Node, "Spot",  // the Shape automatically fits around the TextBlock
        $(go.Shape, "Circle",  // use this kind of figure for the Shape
          // bind Shape.fill to Node.data.color
          new go.Binding("fill", "color")),
        
        $(go.TextBlock,
          { margin: 0 },  // some room around the text
          // bind TextBlock.text to Node.data.key
          new go.Binding("text", "text" ))
      );
      this.myDiagram.model = model;
  }

}