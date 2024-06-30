var a = document.getElementById("first-input");
var b = document.getElementById("second-input");
var addition = document.getElementById("add");
var substraction = document.getElementById("less");
var division = document.getElementById('divide');
var multiplication = document.getElementById('times');
var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (a, b) {
        return a + b;
    };
    Calculator.prototype.subtract = function (a, b) {
        return a - b;
    };
    Calculator.prototype.multiply = function (a, b) {
        return a * b;
    };
    Calculator.prototype.divide = function (a, b) {
        return a / b;
    };
    return Calculator;
}());
;
var calculator = new Calculator();
function buttonPressed(operator) {
    var a = document.getElementById("first-input");
    var b = document.getElementById("second-input");
    var c = parseInt(a.value);
    var d = parseInt(b.value);
    if (operator === '+') {
        console.log(calculator.add(c, d));
        document.getElementById("screen").innerHTML = (calculator.add(c, d)).toString();
    }
    else if (operator === '-') {
        console.log(calculator.subtract(c, d));
        document.getElementById("screen").innerHTML = (calculator.subtract(c, d)).toString();
    }
    else if (operator === '/') {
        console.log(calculator.divide(c, d));
        document.getElementById("screen").innerHTML = (calculator.divide(c, d)).toString();
    }
    else if (operator === '*') {
        console.log(calculator.multiply(c, d));
        document.getElementById("screen").innerHTML = (calculator.multiply(c, d)).toString();
    }
    else {
        console.log("something went wrong");
    }
}
