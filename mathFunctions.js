const runningFunction = {
    a: null,
    b: null,
    operation: null,
    result: null
};

const numberButtons = document.querySelectorAll('.number');

const operationButtons = document.querySelectorAll('.operator');

const screen = document.querySelector('.screen');

const percentageButton = document.getElementById('percentage');

const ac = document.getElementById('ac');

const addButton = document.getElementById('add');

const resultButton = document.getElementById('=');

let numberLock = true;

let resultRequested = false;

const MAX_SCREEN_LENTH = 7;

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return Number((Math.round((a / b) * 100) / 100).toFixed(2));

}

const operate = function(operator, a, b) {
    switch (operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            alert("operate function was passed incorrect value: " + operator);
            console.table(runningFunction);
    }
}

const clearRunningFunction = function() {
    Object.keys(runningFunction).forEach((i) => runningFunction[i] = null)
}

const clear = function() {
    screen.textContent = 0
    clearRunningFunction();
    resultRequested = false;
}

const freshRun = function() {
    return (runningFunction.a == null && runningFunction.b == null && runningFunction.operation == null && runningFunction.result == null) ? true : false;
}

const operationAndASet = function() {
    return (runningFunction.a != null && runningFunction.b == null && runningFunction.operation != null && runningFunction.result == null) ? true : false;
}

const additionalOperation = function() {
    return (runningFunction.a != null && runningFunction.b != null && runningFunction.operation != null && runningFunction.result != null && !resultRequested) ? true : false;
}

const additionalOperationAfterResult = function() {
    return (runningFunction.a != null && runningFunction.b != null && runningFunction.operation != null && runningFunction.result != null && resultRequested) ? true : false;
}

const runFreshRun = function(operationButton) {
    runningFunction.a = Number(screen.textContent);
    runningFunction.operation = operationButton.id;
    resultRequested = false;
    numberLock = true;
}

const runOperationAndAset = function(operationButton) {
    runningFunction.b = Number(screen.textContent);
    runningFunction.result = operate(runningFunction.operation, runningFunction.a, runningFunction.b);
    runningFunction.a = runningFunction.result;
    resultRequested = false;
    screen.textContent = runningFunction.result;
    runningFunction.operation = operationButton.id;
    numberLock = true;
}

const runAdditionalOperation = function(operationButton) {
    runningFunction.b = Number(screen.textContent);
    runningFunction.a = runningFunction.result;
    runningFunction.result = operate(runningFunction.operation, runningFunction.a, runningFunction.b);
    runningFunction.a = runningFunction.result;
    runningFunction.operation = operationButton.id;
    resultRequested = false;
    screen.textContent = runningFunction.result;
    numberLock = true;
}

const runAdditionalOperationAfterResult = function(operationButton) {
    runningFunction.a = runningFunction.result;
    runningFunction.operation = operationButton.id;
    resultRequested = false;
}

const onOperatorButtonClick = function() {
    if (freshRun()) {
        runFreshRun(this);

    } else if (operationAndASet()) {
        runOperationAndAset(this);

    } else if (additionalOperation()) {
        runAdditionalOperation(this);

    } else if (additionalOperationAfterResult()) {
        runAdditionalOperationAfterResult(this);

    } else {
        console.log("unHandled case for add button");
        console.table(runningFunction);
    }
}

const runResultWithRequest = function() {
    runningFunction.a = runningFunction.result;
    runningFunction.result = operate(runningFunction.operation, runningFunction.a, runningFunction.b);
    screen.textContent = runningFunction.result;
    numberLock = true;
}

const runResultWithoutRequest = function() {
    resultRequested = true;
    runningFunction.b = Number(screen.textContent);
    runningFunction.result = operate(runningFunction.operation, runningFunction.a, runningFunction.b);
    screen.textContent = runningFunction.result;
    numberLock = true;
}

const runResult = function() {
    if (freshRun()) {

    } else if (resultRequested) {
        runResultWithRequest();

    } else {
        runResultWithoutRequest();
    }
}

const displayText = function() {
    if (resultRequested) {
        clear();
    }
    if (screen.textContent.length >= MAX_SCREEN_LENTH) {

    } else if (screen.textContent == 0 || numberLock) {
        screen.textContent = this.id;
        numberLock = false;
    } else {
        screen.textContent = screen.textContent + this.id;
    }
}

const turnToPercentage = function() {
    if (resultRequested) {
        screen.textContent = Number(screen.textContent) / 100;
        runningFunction.result = Number(screen.textContent);
        runningFunction.a = runningFunction.result;
    } else {
        screen.textContent = Number(screen.textContent) / 100;
    }
}

const initialize = function() {

    numberButtons.forEach((button) => {
        button.addEventListener('click', displayText);
    });

    ac.addEventListener('click', clear);

    resultButton.addEventListener('click', runResult);

    operationButtons.forEach((button) => {
        button.addEventListener('click', onOperatorButtonClick);
    });

    percentageButton.addEventListener('click', turnToPercentage);
}

initialize();