
const a = document.getElementById("first-input") as HTMLInputElement
const b = document.getElementById("second-input") as HTMLInputElement
const addition = document.getElementById("add")
const substraction = document.getElementById("less")
const division = document.getElementById('divide')
const multiplication = document.getElementById('times')

class Calculator {

        add(a:number, b:number){
        return a + b;
    } 
    
    subtract(a:number, b:number){
        return a - b;
    }
    
    multiply(a:number, b:number){
        return a * b;
    }
    
    divide(a:number, b:number){
        return a / b;
    }
};

const calculator = new Calculator()

function buttonPressed(operator:string)  {

    const a = document.getElementById("first-input") as HTMLInputElement
    const b = document.getElementById("second-input") as HTMLInputElement
    const c = parseInt(a.value)
    const d = parseInt(b.value)

if(operator === '+') {
    console.log(calculator.add(c, d))
    document.getElementById("screen")!.innerHTML = (calculator.add(c, d)).toString()
}

else if (operator === '-') {
    console.log(calculator.subtract(c, d))
    document.getElementById("screen")!.innerHTML = (calculator.subtract(c, d)).toString()
}
else if (operator === '/') {
    console.log(calculator.divide(c, d))
    document.getElementById("screen")!.innerHTML = (calculator.divide(c, d)).toString()
}
else if (operator === '*') {
    console.log(calculator.multiply(c, d))
    document.getElementById("screen")!.innerHTML = (calculator.multiply(c, d)).toString()
}
else {
    console.log("something went wrong")
}
}



