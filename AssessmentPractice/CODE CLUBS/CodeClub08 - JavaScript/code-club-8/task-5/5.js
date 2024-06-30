function taskFiveExecutionPoint() {
    console.log("Interactive FizzBuzz Game")
}

const divisors = [2,4,8,16];
const phrases = ["Fizz", "Buzz", "Bang", "Boom"];

const n1 = 1;
const n2 = 105;

for (let i = n1; i <= n2; i++) {
    let output = "";

    for (let j = 0; j < divisors.length; j++) {
        const divisor = divisors[j];
        const phrase = phrases[j];

        if (i % divisor === 0) {
            output += phrase;
        }
    }

    if (!output) {
        output = i.toString();
    }
    console.log(output);
}

module.exports.run = taskFiveExecutionPoint;