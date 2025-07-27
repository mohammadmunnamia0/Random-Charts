import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [],
  templateUrl: './chart-display.html',
  styleUrl: './chart-display.scss'
})
export class ChartDisplayComponent implements OnInit {
  @Input() data!: { name: string; type: string };
  @Input() width: number = 500;
  @Input() height: number = 400;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit() {
    this.chartOptions = {
      chart: { type: this.data.type as any },
      title: { text: this.data.name },
      series: [{ type: this.data.type as any, name: 'Data', data: [1, 2, 3, 4] }]
    };
  }
}
