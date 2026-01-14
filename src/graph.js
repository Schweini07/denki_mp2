import Chart from "chart.js/auto";
import { getDimensions } from "./api";
import * as controller from "./controller.js";
import Papa from "papaparse";

let chartInstance;

renderChart();
initDefaultValues();

document.getElementById("ratioInput").oninput = (e) => {
    controller.setRatio(e.target.value);  
    renderChart();
};

document.getElementById("chartTypeInput").oninput = (e) => {
  controller.setChartType(e.target.value);
  renderChart();
};

// X Axis Controllers
// document.getElementById("xMinValueInput").oninput = (e) => {
//   controller.setXMinValue(e.target.value)
//   document.getElementById("xMinValueInput").value = e.target.value;
//   renderChart();
// }

// document.getElementById("xMaxValueInput").oninput = (e) => {
//   controller.setXMaxValue(e.target.value)
//   document.getElementById("xMaxValueInput").value = e.target.value;
//   renderChart();
// }

// document.getElementById("xScaleValueInput").oninput = (e) => {
//   controller.setScaleValue("x", e.target.value);
//   renderChart();
// };
// document.getElementById("xScaleTypeInput").oninput = (e) => {
//   controller.setScaleType("x", e.target.value);
//   renderChart();
// };

// Y Axis Controllers
document.getElementById("yMinValueInput").oninput = (e) => {
  controller.setYMinValue(e.target.value)
  document.getElementById("yMinValueInput").value = e.target.value;
  renderChart();
}

document.getElementById("yMaxValueInput").oninput = (e) => {
  controller.setYMaxValue(e.target.value)
  document.getElementById("yMaxValueInput").value = e.target.value;
  renderChart();
}

document.getElementById("yScaleValueInput").oninput = (e) => {
  controller.setScaleValue("y", e.target.value);
  renderChart();
};
document.getElementById("yScaleTypeInput").oninput = (e) => {
  controller.setScaleType("y", e.target.value);
  renderChart();
}; 

async function initDefaultValues() {
  await renderChart();

  if (!chartInstance) {
    return;
  }

  document.getElementById("ratioInput").value = chartInstance.aspectRatio;

  //chartInstance.scales.x.value = 1;
  //document.getElementById("xScaleValueInput").value = chartInstance.scales.x.value;
  //document.getElementById("xMinValueInput").value = chartInstance.scales.x.min;
  //document.getElementById("xMaxValueInput").value = chartInstance.scales.x.max;

  chartInstance.scales.y.value = 1;
  document.getElementById("yScaleValueInput").value = chartInstance.scales.y.value;
  document.getElementById("yMinValueInput").value = chartInstance.scales.y.min;
  document.getElementById("yMaxValueInput").value = chartInstance.scales.y.max;
}

async function renderChart() {
  console.log("rendering...");

  const results = await new Promise((resolve, reject) => {
    Papa.parse("/res/chart_data/global_temperature.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: resolve,
      error: (err) => reject(err),
    });
  });

  const csvData = results.data;
  const labels = csvData.map((row) => row.Year);
  const temperatures = csvData.map((row) => parseFloat(row.Temperature));

  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(document.getElementById("graph"), {
    type: controller.chartType,
    data: {
      labels: labels,
      datasets: [
        {
          label: "Global Temperature Mean since 1850",
          data: temperatures,
        },
      ],
    },
    options: {
      aspectRatio: controller.chartRatio,
      scales: {
        y: {
          type: controller.yType,
          grace: "10%",
          ticks: {
            stepSize: controller.yValue,
            callback: function(value) {
              if (typeof value === 'number') {
                return value.toFixed(2) + "°C";
              }
              return value;
            }
          },
          title: {
            display: true,
            text: "Temperature Mean",
          },
          min: controller.yMinValue,
          max: controller.yMaxvalue,
          value: controller.yScaleValue
        },
        x: {
          type: "category",
          ticks: {
            stepSize: controller.xValue,
          },
          title: {
            display: true,
            text: "Year",
          },
          //min: controller.xMinValue,
          //max: controller.xMaxvalue,
          //value: controller.xScaleValue
        },
      },
    },
  });

  console.log("done rendering!");
}
