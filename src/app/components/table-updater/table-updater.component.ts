import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-updater',
  templateUrl: './table-updater.html',
})
export class TableUpdaterComponent {
  @Input() tableComponent!: Component | any;
  @Input() updaterFunctionName!: string;
  minutes: number[] = [1,3,5,10];
  selectedValue = '0';
  private intervalId!: number | any ;

  constructor() {
  }

  selectChange(){
    clearInterval(this.intervalId);
    if (parseInt(this.selectedValue) > 0)
    this.intervalId = setInterval(()=>this.executeUpdate(), parseInt(this.selectedValue) * 1000 * 60);
  }

  executeUpdate() {
    this.tableComponent[this.updaterFunctionName]();
  }

}
