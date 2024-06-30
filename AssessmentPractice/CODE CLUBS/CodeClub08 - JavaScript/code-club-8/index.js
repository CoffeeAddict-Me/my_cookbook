const task1 = require('./task-1/1');
const task2 = require('./task-2/2');
const task3 = require('./task-3/3');
const task4 = require('./task-4/4');
const task5 = require('./task-5/5');
// const task6 = require('./task-6/6');

const selectedTask = process.argv[2];
console.log("Selected task: ", selectedTask);

switch(parseInt(selectedTask)) {
    case 1:
        task1.run();
        break;
    case 2:
        task2.run();
        break;
    case 3:
        task3.run();
        break;
    case 4:
        task4.run();
        break;
    case 5:
        task5.run();
        break;
    // case 6:
    //     task6.run();
    //     break;
    default:
        console.log("Invalid task number");
        break;
}
