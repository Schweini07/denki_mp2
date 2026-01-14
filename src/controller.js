export let chartRatio = 1;

export let chartType = "bar";
export let chartLabel = "Label";

export let xPrefix = "";
export let xSuffix = "";
export let xMod = 1;
export let xMinValue;
export let xMaxvalue;
export let xValue = 10;
export let xType = "linear";
export let yPrefix = "";
export let ySuffix = "";
export let yMod = 1;
export let yMinValue;
export let yMaxvalue;
export let yScaleValue = 1;
export let yType = "linear";

// document.getElementById("testBut").onclick = testFunc;

// -------- functions
export function setRatio(value) {
  if (value == 0)
    return;

  chartRatio = value;
  console.log("setting ratio to: " + chartRatio);
}

export function setChartType(type) {
  console.log("setting chart type to: " + type);
  chartType = type;
}

export function setScaleValue(axis, value) {
  console.log("setting scale value of: " + axis + " to: " + value);
  if (axis === "x") xValue = value;
  else yScaleValue = value;
}

export function setScaleType(axis, type) {
  console.log("setting scale type of: " + axis + " to: " + type);
  if (axis === "x") xType = type;
  else yType = type;
}

export function setYMinValue(value) {
  yMinValue = value;
}

export function setYMaxValue(value) {
  yMaxvalue = value;
}

export function setXMinValue(value) {
  xMinValue = value;
}

export function setXMaxValue(value) {
  xMaxvalue = value;
}
