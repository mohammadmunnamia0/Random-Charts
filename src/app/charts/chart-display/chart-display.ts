import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption, SeriesOption } from 'echarts';

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  template: `
    <echarts
      [options]="chartOptions"
      [style.width.px]="width"
      [style.height.px]="height"
      (chartInit)="onChartInit($event)">
    </echarts>
  `
})
export class ChartDisplayComponent implements OnChanges {
  @Input() data: { type?: string; name?: string } | null = null;
  @Input() width = 500;
  @Input() height = 400;

  chartOptions: EChartsOption = {
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

  // Update ngOnChanges method:
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && changes['data']) {
      const chartType = (this.data.type ?? 'line') as
        | 'line'
        | 'bar'
        | 'pie'
        | 'graph'
       ;

      this.chartOptions = {
        ...this.chartOptions,
        series: [{
          type: chartType,
          data: this.generateChartData()
        }] as SeriesOption[]
      };
      
      this.chartInstance?.resize();
    }
  }

  private generateChartData(): number[] {
    return [Math.random() * 100, Math.random() * 100, Math.random() * 100];
  }

  chartInstance: any;

  onChartInit(ec: any) {
    this.chartInstance = ec;
    this.chartInstance.showLoading();
    setTimeout(() => this.chartInstance.hideLoading(), 1000);
  }
}
