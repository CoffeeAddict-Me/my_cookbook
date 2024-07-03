import java.util.Scanner;

public class SumOfDigits {
    public static void main(String[] args) {
        System.out.println("Provide an Integer");
        Scanner scanner = new Scanner(System.in);
        Integer number = scanner.nextInt();
        System.out.println("Sum of digits: " + sumOfDigits(number));
        scanner.close();
    }

    public static Integer sumOfDigits(Integer number) {
        Integer sum = 0;
        while (number != 0) {
            sum += number % 10;
            number /= 10;

        }
        return sum;
    }

}
