import java.util.Scanner;

public class ReverseString {
    public static void main(String[] args) {
        System.out.println("Provide a string");
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        System.out.println("Reverse: " + reverseString(str));
        scanner.close();
    }

    public static String reverseString(String str){
        String reverse = new StringBuilder(str).reverse().toString();
        return reverse;
    }
}
