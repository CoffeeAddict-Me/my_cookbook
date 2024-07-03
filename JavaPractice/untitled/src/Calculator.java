import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double firstNumber;
        double secondNumber;
        String operation;
        System.out.println("Provide first number");
        firstNumber = scanner.nextDouble();
        System.out.println("You provided " + firstNumber);

        System.out.println("Provide second number");
        secondNumber = scanner.nextDouble();
        System.out.println("You provided " + secondNumber);

        System.out.println("provide operation: + - / *");
        operation = scanner.next();

        switch (operation) {
            case "+":
                System.out.println(firstNumber + secondNumber);
                break;
            case "-":
                System.out.println(firstNumber - secondNumber);
                break;
            case "*":
                System.out.println(firstNumber * secondNumber);
                break;
            case "/":
                if (secondNumber == 0) {
                    System.out.println("You cannot divide by zero");
                } else {
                    System.out.println(firstNumber / secondNumber);
                }
                break;
            default: {
                System.out.println("Incorrect command");
            }

        }
        System.out.println("Thank you for using the amazing calculator");
        scanner.close();

    }
}
