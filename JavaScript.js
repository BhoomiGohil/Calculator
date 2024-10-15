// Initialize default values
var enterValue = "0";
var previousValue = 0;
var previousOperator = null;

// Select elements from the DOM
const screenText = document.querySelector(".text");
var buttons = document.querySelectorAll(".button"); // Select all buttons

// Add click event listeners to each button
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    buttonhandles(event.target.innerHTML); // Handle button clicks
  });
}

// Handle button input (either a symbol or number)
function buttonhandles(value) {
  if (isNaN(value)) {
    handlesSymbol(value); // Handle non-numeric input
  } else {
    handlesValue(value); // Handle numeric input
  }
  display(); // Update display after handling input
}

// Update the entered value
function handlesValue(value) {
  enterValue = enterValue === "0" ? value : enterValue + value;
}

// Handle symbols like C, ←, =, or operators
function handlesSymbol(value) {
  switch (value) {
    case "C": // Clear all values
      enterValue = "0";
      previousValue = 0;
      previousOperator = null;
      break;
    case "←": // Backspace operation
      enterValue = enterValue.length === 1 ? "0" : enterValue.slice(0, -1);
      break;
    case "=": // Perform calculation
      if (previousOperator === null) return;
      Operation(parseInt(enterValue));
      enterValue = String(previousValue);
      previousOperator = null;
      previousValue = 0;
      break;
    default: // Handle arithmetic operators
      handleMath(value);
      break;
  }
}

// Store the operator and prepare for the next input
function handleMath(value) {
  const enterValueInt = parseInt(enterValue);
  previousOperator = value;
  enterValue = "0";

  if (previousValue === 0) {
    previousValue = enterValueInt;
  } else {
    Operation(enterValueInt);
  }
}

// Perform the arithmetic operation
function Operation(enterValueInt) {
  if (previousOperator === "+") {
    previousValue += enterValueInt;
  } else if (previousOperator === "-") {
    previousValue -= enterValueInt;
  } else if (previousOperator === "×") {
    previousValue *= enterValueInt;
  } else {
    previousValue /= enterValueInt;
  }
}

// Update the screen display
function display() {
  screenText.innerHTML = enterValue;
}
