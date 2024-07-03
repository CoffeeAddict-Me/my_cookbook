public class Primes {
    public static void main(String[] args) {

        boolean isPrime = true;
        int number = 8;

        if (number == 0 || number == 1) {
            System.out.println(number + " is not prime number");
        } else {
            for (int i = 2; i <= number / 2; i++) {
                if (number % i == 0) {
                    System.out.println(number + " is not prime number");
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                System.out.println(number + " is prime number");
            }
        }
    }
}

