import java.util.Scanner;

public class Fibonacci {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        System.out.println("how many counts do you need?");
        Integer count = scanner.nextInt();
        scanner.close();
        System.out.println(fibonacciZeroIncluded(count));


//        Integer n1 = 0;
//        Integer n2 = 1;
//        Integer n3;
//        Integer count = 4;
//
//        System.out.print(n1 + " " + n2);
//
//        for (int i = 2; i < count; i++) {
//            {
//                n3 = n1 + n2;
//                System.out.print(" " + n3);
//                n1 = n2;
//                n2 = n3;
//            }
//
//        }
    }


    private static String fibonacciZeroIncluded(int count) {
        if (count <= 0) {
            return "";
        }

        String result = "";
        int current = 1;
        int previous = 0;

        for (int i = 0; i < count; i++) {
            if (i == 0) {
                result += previous + " ";
            } else if (i == 1) {
                result += current + " ";
            } else {
                int temp = current;
                current = current + previous;
                previous = temp;

                result += current + " ";
            }
        }

        return result.trim();
    }

    private static String fibonacciWithoutZero(int count) {
        if (count <= 0) {
            return "Please provide number greater than zero";
        }

        String result = "";
        int current = 1;
        int previous = 1;

        for (int i = 1; i <= count; i++) {
            if (i == 1 || i == 2) {
                result += "1 ";
            } else {
                int temp = current;
                current = current + previous;
                previous = temp;

                result += current + " ";
            }
        }

        return result.trim();
    }





//    int n = 10;
//    int[] fibonacciSequence = new int[n];
//
//    // Initial values for the first two terms
//    fibonacciSequence[0] = 0;
//    fibonacciSequence[1] = 1;
//
//    // Calculate the rest of the Fibonacci sequence
//        for (int i = 2; i < n; i++) {
//        fibonacciSequence[i] = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
//    }
//
//    // Print the Fibonacci sequence
//        for (int i = 0; i < n; i++) {
//        System.out.print(fibonacciSequence[i] + " ");
//    }
}


