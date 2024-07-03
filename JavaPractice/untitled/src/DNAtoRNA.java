import java.util.Scanner;

public class DNAtoRNA {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("input dna: ");
        String dna = scanner.next();
        System.out.println(dnaToRna(dna));
        scanner.close();
    }
    public static String dnaToRna(String dna) {
        return dna.replace('T', 'U');  // Do your magic!
    }

}
