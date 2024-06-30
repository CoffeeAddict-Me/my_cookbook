function taskThreeExecutionPoint() {
    console.log("Custom FizzBuzz")
}

n1 = 10;
n2 = 50;

for (let i = n1; i <= n2; i++ ){
    if(i % 3 === 0 && i % 5 === 0){
        console.log("FizzBuzz")
    }
    else if(i % 3 === 0){
        console.log("Fizz");
    } else if(i % 5 === 0 ){
        console.log("Buzz")
    } else {
        console.log(i)
    }

}


module.exports.run = taskThreeExecutionPoint;