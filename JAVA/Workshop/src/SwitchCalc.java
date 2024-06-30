import java.math.BigDecimal;
import java.util.Scanner;

public class SwitchCalc {
    public static void main(String[] args) {

        Scanner awesomeScanner = new Scanner(System.in);
        Calculator awesomeCalculator = new Calculator();

        System.out.print("\nGive me x: ");
        BigDecimal num1 = awesomeScanner.nextBigDecimal();
        System.out.println("\n press + for addition \n press - for subtraction \n press * for multiplication \n press / for division");
        String operation = awesomeScanner.next();
        System.out.print("\nGive me y: ");
        BigDecimal num2 = awesomeScanner.nextBigDecimal();
        awesomeScanner.close();

        BigDecimal result;
        switch (operation) {
            case "+":
                result = awesomeCalculator.addition(num1, num2);
                break;
            case "-":
                result = awesomeCalculator.subtraction(num1, num2);
                break;
            case "*":
                result = awesomeCalculator.multiplication(num1, num2);
                break;
            case "/":
                result = awesomeCalculator.division(num1, num2);
                break;
            default:
                System.out.println("");
                return;
        }

        System.out.println(result);
    }
}
