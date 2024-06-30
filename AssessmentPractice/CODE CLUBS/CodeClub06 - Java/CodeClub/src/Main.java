import java.util.Scanner;

public class Main {

    Scanner scanner = new Scanner(System.in);
    public  String sen = scanner.nextLine();

    public String longestWord(String sen){
        String [] words = sen
                //replace all
                .replaceAll("[^a-zA-Z0-9 ]", " ")
                //split the sentence into words and remove white spaces
                .split("\\s+");
        String longest = "";
        //check if the word is the longest
        for(String word : words){
            if(word.length() > longest.length()){
                longest = word;
            }
        }
        return longest;
    }

    public String shortestWord(String sen){
        String [] words = sen
                //replace all
                .replaceAll("[^a-zA-Z0-9 ]", " ")
                //split the sentence into words and remove white spaces
                .split("\\s+");
        //check if the array words has a length greater than 0, meaning it's not empty
        //words[0] is the value assigned to "shortest" if the condition is true. It takes the first element of the array words.

        String shortest = words.length > 0 ? words[0] : "";

        //check if the word is the shortest
        for(String word : words){
            if(word.length() < shortest.length()){
                shortest = word;
            }
        }
        return shortest;
    }




    public static void main(String[] args) {
        System.out.println("Enter a sentence:");
        Main main = new Main();
        System.out.println("Longest word without punctuation: " + main.longestWord(main.sen));
        System.out.println("Shortest word without punctuation: " + main.shortestWord(main.sen));
    }
}