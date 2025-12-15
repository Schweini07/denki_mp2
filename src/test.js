export let chartRatio = 1;

export let chartType = "bubble";
export let chartLabel = "Label";

export let xPrefix = "";
export let xSuffix = "";
export let xMod = 1;
export let xType = "linear";
export let yPrefix = "";
export let ySuffix = "";
export let yMod = 1;
export let yType = "linear";

// document.getElementById("testBut").onclick = testFunc;
document.getElementById("chartTypeInput").onchange = (e) => {
  setChartType(e.target.value);
};

document.getElementById("xScaleTypeInput").onchange = (e) => {
  setScaleType("x", e.target.value);
};

document.getElementById("yScaleTypeInput").onchange = (e) => {
  setScaleType("y", e.target.value);
};

// -------- functions
export function setRatio() {
  chartRatio = document.getElementById("ratioInput").value;
  console.log("setting ratio to: " + chartRatio);
}

export function setChartType(type) {
  console.log("setting chart type to: " + type);
  chartType = type;
}

export function setScaleType(axis, type) {
  console.log("setting scale type of: " + axis + " to: " + type);
  if (axis === "x") xType = type;
  else yType = type;
}
