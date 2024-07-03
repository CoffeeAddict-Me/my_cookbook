import java.util.Scanner;

public class Palindrome {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Input your word");
        String word = scanner.next();
        System.out.println("Is a palindrome: " + checkPalindrome(word));
        scanner.close();
    }

    public static boolean checkPalindrome(String word){
        String reverse = new StringBuilder(word).reverse().toString();
        return word.equals(reverse);
    }
}
