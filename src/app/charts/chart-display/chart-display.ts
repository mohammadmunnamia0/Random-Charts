import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
   templateUrl: './chart-display.html',
})
export class ChartDisplayComponent implements OnChanges {
  @Input() data: { type?: string; name?: string } | null = null;
  @Input() width = 500;
  @Input() height = 400;

  chartOptions: any = {
    title: { text: 'My Chart' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
    yAxis: {
      type: 'value'
    },
    series: []
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      const chartType = this.data.type ?? 'line';
      const chartName = this.data.name ?? 'Sample Chart';
      const sampleData = [29, 71, 106, 129, 144];

      this.chartOptions = {
        title: { text: chartName },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: chartName,
            type: chartType,
            data: sampleData
          }
        ]
      };
    }
  }
}
