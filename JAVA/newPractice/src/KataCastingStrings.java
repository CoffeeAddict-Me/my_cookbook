import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class KataCastingStrings {

//    Jaden Smith, the son of Will Smith, is the star of films such as The Karate Kid (2010) and After Earth (2013). Jaden is also known for some of his philosophy that he delivers via Twitter. When writing on Twitter, he is known for almost always capitalizing every word. For simplicity, you'll have to capitalize each word, check out how contractions are expected to be in the example below.
//    Your task is to convert strings to how they would be written by Jaden Smith. The strings are actual quotes from Jaden Smith, but they are not capitalized in the same way he originally typed them.
//    Example:
//    Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
//    Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
//    Note that the Java version expects a return value of null for an empty string or null.

    public static String toJadenCase(String phrase) {
        // TODO put your code below this comment
            if(phrase == null || phrase.equals("")) return null;

            char[] array = phrase.toCharArray();

            for(int x = 0; x < array.length; x++) {
                if(x == 0 || array[x-1] == ' ') {
                    array[x] = Character.toUpperCase(array[x]);
                }
            }

            return new String(array);
        }

    public static void main(String[] args) {
        System.out.println(toJadenCase("some annoying phrase"));
    }

}
