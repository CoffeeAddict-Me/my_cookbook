import java.util.Scanner;

public class DoubleInputs {

    public static void main(String[] args) {
        Scanner awesomeScanner = new Scanner(System.in);
        DoubleCalc doubleCalc = new DoubleCalc();
        boolean finished = false;

        while (finished) {
            System.out.println("Gimme x:");
            double num1 = awesomeScanner.nextDouble();

            System.out.println("Gimme operation: + - / *");
            String op = awesomeScanner.next();

            System.out.println("Gimme y:");
            double num2 = awesomeScanner.nextDouble();


            double result = switch (op) {
                case "+" -> doubleCalc.add(num1, num2);
                case "-" -> doubleCalc.sub(num1, num2);
                case "*" -> doubleCalc.mul(num1, num2);
                case "/" -> validateBeforeCalculate(num1, num2, doubleCalc);
                default -> throw new RuntimeException("Invalid Operation");
            };

            System.out.println("Result is: " + result);

            System.out.println("Do you want to continue? (Y/N)");
            String cont = awesomeScanner.next();
            finished = cont.equals("Y") || cont.equals("y");
        }
        awesomeScanner.close();


}
    private static double validateBeforeCalculate ( double num1, double num2, DoubleCalc doubleCalc){
        if (num2 == 0) {
            throw new RuntimeException("Division by 0 is not allowed");
        } else {
            return doubleCalc.div(num1, num2);
        }
    }
}

