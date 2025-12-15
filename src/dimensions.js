import Chart from "chart.js/auto";
import { getDimensions } from "./api";
import * as controller from "./test.js";

let chartInstance;
document.getElementById("renderButton").onclick = renderChart;
document.getElementById("ratioInput").oninput = () => {
  renderChart();
  controller.setRatio();
};

async function renderChart() {
  console.log("rendering...");

  const data = await getDimensions();

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(document.getElementById("dimensions"), {
    type: controller.chartType,
    options: {
      aspectRatio: controller.chartRatio,
      scales: {
        x: {
          type: controller.xType,
          max: 500,
          ticks: {
            callback: (value) => `${value / 100} m`,
          },
        },
        y: {
          type: controller.yType,
          max: 500,
          ticks: {
            callback: (value) => `${value / 100} m`,
          },
        },
      },
    },
    data: {
      labels: data.map((x) => x.year),
      datasets: [
        {
          label: "Dimensions",
          data: data.map((row) => ({
            x: row.width,
            y: row.height,
            r: row.count,
          })),
        },
      ],
    },
  });

  console.log("done rendering!");
}
