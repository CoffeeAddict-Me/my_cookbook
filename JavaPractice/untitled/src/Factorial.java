import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("please provide your number");
        double number = scanner.nextDouble();
        scanner.close();
        double result = 1;
        for (int i = 1; i <= number; i++) {
            result = result*i;
        }
        System.out.println("Factorial of " + number + " is " + result);

    }
}
