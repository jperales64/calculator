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
    return a / b;
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
            console.alert("operate function was passed incorrect value")
    }
}

//Create a onclick function for numbers that displays number on screen
//for now clear screen on each click!

const numberButtons = document.querySelectorAll('.number');

const screen = document.querySelector('.screen');

const ac = document.getElementById('ac');

//more needs to be added to this ie clear number variables
ac.addEventListener('click', () => {
    screen.textContent = 0
})



numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        screen.textContent = button.id;
    });
});