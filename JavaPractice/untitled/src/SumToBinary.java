import java.util.Scanner;

public class SumToBinary {
    public static void main(String[] args) {
        System.out.println("Provide an Integer");
        Scanner scanner = new Scanner(System.in);
        Integer number = scanner.nextInt();
        System.out.println("Sum in binary: " + binaryAddition(number));
        scanner.close();
    }
    public static  String binaryAddition(int number) {
        return Integer.toBinaryString(number);
    }
}
