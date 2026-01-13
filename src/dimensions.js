import Chart from "chart.js/auto";
import { getDimensions } from "./api";
import * as controller from "./test.js";
import Papa from "papaparse"

let chartInstance;
document.getElementById("renderButton").onclick = renderChart;
document.getElementById("ratioInput").oninput = () => {
  renderChart();
  controller.setRatio();
};

renderChart()

async function renderChart() {
  console.log("rendering...");

  const results = await new Promise((resolve, reject) => {
    Papa.parse("/res/chart_data/global_temperature.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: resolve,
        error: (err) => reject(err)
    });
});


  const csvData = results.data;
  const labels = csvData.map(row => row.Year);
  const temperatures = csvData.map(row => parseFloat(row.Temperature));

  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(document.getElementById("dimensions"), {
    type: controller.chartType,
    data: {
      labels: labels,
      datasets: [{
        label: "Global Temperature Mean since 1850",
        data: temperatures,
      }],
    },
    options: {
      aspectRatio: controller.chartRatio,
      scales: {
          y: {
            type: controller.yType,
            grace: '10%', 
            ticks: {
                stepSize: controller.yValue,
                callback: (value) => value.toFixed(2) + '°C'
            },
            title: {
                display: true,
                text: "Temperature Mean"
            }
        },
        x: {
            type: "category",
            ticks: {
              stepSize: controller.xValue
            },
            title: {
                display: true,
                text: "Year"
            }
        }
      }
    }
  });

  console.log("done rendering!");
}
