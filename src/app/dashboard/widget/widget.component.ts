import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent {
  @Input('count') count: number;
  @Input('name') name: string;
  @Input('isSelected') isSelected: boolean;
  @Output('select') click = new EventEmitter();

  onClick(){
    this.click.emit(this.name);
  }
}
