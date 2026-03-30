const readline= require('readline-sync');
const calc= require('./calculator');

const input= readline.question(`
    Choose Operation:
    1.Add
    2.Subtract
    3.Multiply
    4.Divide
    Enter Choice: 
    `);

    let num1=Number(readline.question("Enter first number: "));
    let num2= Number(readline.question("Enter second number: "));

    let result;

    switch(input){
        case "1":
            result=calc.add(num1,num2);
            break;
         case "2":
            result=calc.subtract(num1,num2);
            break;
             case "3":
            result=calc.multiply(num1,num2);
            break;
             case "4":
            result=calc.divide(num1,num2);
            break;
            default:
                result="Invalid Choice";

                
    }
    console.log("Result:", result);