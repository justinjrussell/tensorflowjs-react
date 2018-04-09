import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class Chart extends Component {
  options = {
    scaleShowVerticalLines: false,
    responsive: true,
    backgroundColor: "#ef6c00",
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontSize: 40
          }
        }
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false
          }
        }
      ]
    }
  }
  legend = {
    display: false
  }
  render() {
    const data = {
      labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      datasets: [
        {
          data: this.props.data || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: "Predictions",
          backgroundColor: "#ef6c00"
        }
      ]
    };
    return (
      <div className="chart-wrapper">
        <div style={{ display: "block" }}>
          <Bar data={data} options={this.options} legend={this.legend} />
        </div>
      </div>
    );
  }
}
