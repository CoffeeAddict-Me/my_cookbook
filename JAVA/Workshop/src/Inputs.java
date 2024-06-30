import java.math.BigDecimal;
import java.util.Scanner;

public class Inputs  {

    public static void main2(String[] args) {
        System.out.println(">>>> " + (new BigDecimal("1.0").compareTo(new BigDecimal("1.00")) == 0));
    }
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




        if (operation.equals("+")){
            BigDecimal result = awesomeCalculator.addition(num1, num2);
            System.out.println(result);
        } else if (operation.equals("-")){
            BigDecimal result = awesomeCalculator.subtraction(num1, num2);
            System.out.println(result);
        } else if (operation.equals("*")) {
            BigDecimal result = awesomeCalculator.multiplication(num1, num2);
            System.out.println(result);
        } else if (operation.equals("/") && (num2.compareTo(new BigDecimal("0"))!= 0)){
            BigDecimal result = awesomeCalculator.division(num1, num2);
            System.out.println(result);
        } else if (operation.equals("/") && (num2.compareTo(new BigDecimal("0"))== 0)) {
            System.out.println("You cannot divide by zero!");
        } else {
            System.out.println("operation invalid");
        }
    }
}
