const numBtns = document.querySelectorAll(".btn-number");
const opBtns = document.querySelectorAll(".btn-operator");
const equalsBtn = document.getElementById("btn-equals");
const backBtn = document.getElementById("btn-back");
const plusMinBtn = document.getElementById("btn-plus-min");
const clearBtn = document.getElementById("btn-clear");
const dotBtn = document.getElementById("btn-dot");

const displayCalc = document.getElementById("display-calc");
const displayOps = document.getElementById("display-ops");

const equation = {
  a: 0,
  b: 0,
  result: null,
  operator: "",
};

let displayValue = "0";

setupBtns();

function operate(operator, a, b) {
  return operator == "+"
    ? add(a, b)
    : operator == "-"
    ? subtract(a, b)
    : operator == "*"
    ? multiply(a, b)
    : operator == "/"
    ? divide(a, b)
    : b;
}

function calculate() {
  if (displayValue != "") {
    equation.b = parseFloat(displayValue);
    if (equation.b == 0 && equation.op == "/") {
      alert("Can't divide by 0!");
      return;
    }
  } else if (equation.b == null) {
    return;
  }
  updateDisplayOps(false);
  equation.result = operate(
    equation.operator,
    parseFloat(equation.a),
    parseFloat(equation.b)
  );

  updateDisplay(equation.result);
  updateValues();
}

function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function getInputNum(num) {
  if (displayValue == 0) {
    displayValue = "";
  }
  displayValue += num;
  updateDisplay(displayValue);
}

function getInputOperator(op) {
  if (equation.a === 0 && equation.operator == "") {
    equation.operator = op;
    equation.a = displayValue;
    displayValue = "";
  } else {
    console.log("displayvalue = " + displayValue);
    // equation.b = parseFloat(displayValue);
    calculate();
    equation.operator = op;
  }
}

function insertDot() {
  if (displayValue.includes(".")) return;
  else if (displayValue == "0") {
    displayValue = "0.";
  } else {
    displayValue += ".";
  }

  updateDisplay(displayValue);
}

function togglePlusMin() {
  if (displayValue == "" && equation.result != null) {
    let isMin = equation.result.toString().includes("-");
    displayValue = isMin
      ? equation.result.toString().substring(1)
      : "-" + equation.result;
  } else {
    let isMin = displayValue.includes("-");
    displayValue = isMin ? displayValue.substring(1) : "-" + displayValue;
  }
  updateDisplay(displayValue);
}

function updateValues() {
  equation.a = equation.result;
  updateDisplay(equation.a);
  equation.b = null;
  // equation.result = null;
  displayValue = "";
  equation.op = "";
}

function clear() {
  (equation.a = null),
    (equation.b = null),
    (equation.result = null),
    (equation.operator = "");
  updateDisplay(0);
  updateDisplayOps(true);
}

function setupBtns() {
  numBtns.forEach((btn) => {
    btn.addEventListener("click", () => getInputNum(btn.value));
  });
  opBtns.forEach((btn) => {
    btn.addEventListener("click", () => getInputOperator(btn.value));
  });
  // equalsBtn.addEventListener("click", () => getInputOperator(equalsBtn.value));
  equalsBtn.addEventListener("click", calculate);
  clearBtn.addEventListener("click", clear);
  dotBtn.addEventListener("click", insertDot);
  plusMinBtn.addEventListener("click", togglePlusMin);
  backBtn.addEventListener("click", onBack);
  window.addEventListener("keydown", inputKey);
}

function inputKey(e) {
  let key = document.querySelector(`button[data-key="${e.key}"]`);
  console.log(e);
  return e.keyCode == "/" || e.key == "*" || e.key == "+" || e.key == "-"
    ? getInputOperator(key.getAttribute("data-key"))
    : e.key === "Enter"
    ? calculate()
    : e.key >= 0 && e.key < 10
    ? getInputNum(key.getAttribute("data-key"))
    : e.key === "Backspace"
    ? onBack()
    : e.key === "."
    ? insertDot()
    : key;
}

function onBack() {
  if (displayValue == "0") {
    return;
  } else if (displayValue.toString().length == 1) {
    displayValue = "0";
  } else {
    displayValue = displayValue.slice(0, displayValue.length - 1);
  }
  updateDisplay(displayValue);
}

function updateDisplay(number) {
  let value =
    number.toString().length > 11 ? number.toString().slice(0, 11) : number;
  displayCalc.textContent = value.toString();
}

function updateDisplayOps(clear) {
  if (clear) {
    displayOps.textContent = "";
  } else if (equation.a == null) {
    return;
  } else {
    displayOps.textContent =
      equation.b != null
        ? `${equation.a} ${equation.operator} ${equation.b}`
        : `${equation.a} ${equation.operator}`;
  }
}
