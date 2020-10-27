const numBtns = document.querySelectorAll(".btn-number");
const opBtns = document.querySelectorAll(".btn-operator");
const equalsBtn = document.getElementById("btn-equals");
const modulusBtn = document.getElementById("btn-modulus");
const plusMinBtn = document.getElementById("btn-plus-min");
const clearBtn = document.getElementById("btn-clear");

const displayCalc = document.getElementById("display-calc");
const displayOps = document.getElementById("display-ops");

const equation = {
  a: 0,
  b: 0,
  result: null,
  operator: "",
};

let displayValue = "";
let lastSavedResult;

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
    equation.b = parseInt(displayValue);
  }
  if (equation.b == null) {
    return;
  }

  equation.result = operate(
    equation.operator,
    parseInt(equation.a),
    parseInt(equation.b)
  );

  updateDisplay(equation.result);
  updateValues();
}

function add(a, b) {
  return parseInt(a) + parseInt(b);
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
  displayValue += num;
  updateDisplay(displayValue);
}

function getInputOperator(op) {
  if (equation.a == 0 && equation.operator == "") {
    equation.operator = op;
    equation.a = displayValue;
    displayValue = "";
  } else {
    console.log("displayvalue = " + displayValue);
    // equation.b = parseInt(displayValue);
    calculate();
    equation.operator = op;
  }

  console.log("operator: " + equation.op);
  updateDisplayOps();
}

function updateValues() {
  equation.a = equation.result;
  updateDisplayOps(equation.a);
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
}

function updateDisplay(value) {
  displayCalc.textContent = value.toString();
}

function updateDisplayOps() {
  displayOps.textContent =
    equation.b != null
      ? `${equation.a} ${equation.operator} ${equation.b}`
      : `${equation.a} ${equation.operator}`;
}

function updateDisplayCalculations() {}
