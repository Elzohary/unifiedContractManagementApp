import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){

    this.chart = new Chart ("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14' ],
	       datasets: [
          {
            label: "Income",
            data: ['467','576', '572', '79', '92',
								],
            backgroundColor: '#0f3531'
          },
          {
            label: "Expenses",
            data: ['542', '542', '536', '327', '17',
									],
            backgroundColor: '#cf6329'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
}
