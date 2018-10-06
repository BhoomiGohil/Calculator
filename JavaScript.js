var enterValue = "0";
var previousValue = 0;
var previousOperator = null;
const screen = document.querySelector(".text");

var main = document.querySelectorAll(".button");

for (var i = 0; i < main.length; i++) {
    main[i].addEventListener("click", function () {
        buttonhandles(event.target.innerHTML);
    })
}

function buttonhandles(value) {
    if (isNaN(value)) {
        handlesSymbol(value);
    }
    else {
        handlesValue(value);
    }
    display();
}

function handlesValue(value) {
    if (enterValue === "0") {
        enterValue = value;
    }
    else {
        enterValue += value;
    }
}

function handlesSymbol(value) {
    switch (value) {
        case "C":
            enterValue = "0";
            previousValue = 0;
            previousOperator = null;
            break;
        case "←":
            l = enterValue.length;
            if (l === 1)
                enterValue = "0";
            else
                enterValue = enterValue.substring(0, l - 1);
            break;
        case "=":
            if(previousOperator === null)
            {
                return;
            }
            Operation(parseInt(enterValue));
            enterValue = String(previousValue);
            previousOperator = null;
            previousValue = 0;
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    enterValueInt = parseInt(enterValue);
    previousOperator = value;
    enterValue = "0";
    if(previousValue === 0)
    {
        previousValue = enterValueInt;
    }
    else
    {
        Operation(enterValueInt);
    }
}

function Operation(enterValueInt) {
    if (previousOperator === "+") {
        previousValue = previousValue + enterValueInt;
    }
    else if (previousOperator === "-") {
        previousValue = previousValue - enterValueInt;
    }
    else if (previousOperator === "×") {
        previousValue = previousValue * enterValueInt;
    }
    else {
        previousValue = previousValue / enterValueInt;
    }
}

function display() {
    screen.innerHTML = enterValue;
}
