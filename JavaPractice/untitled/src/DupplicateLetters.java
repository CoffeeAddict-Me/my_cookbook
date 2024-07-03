import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class DupplicateLetters {

    public static void main(String[] args) {
        String s = "Hello";
        System.out.println(accum(s));

    }
    public static String accum(String s) {
        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            stringBuilder .append(Character.toUpperCase(c));
            for (int j = 0; j < i; j++) {
                stringBuilder.append(Character.toLowerCase(c));
            }
            if (i<s.length()-1) {
                stringBuilder.append("-");
            }

        } return stringBuilder.toString();



//        for (int i = 0; i < s.length(); i++) {
//            char c = s.charAt(i);
//            for (int j = 0; j < i; j++) {
//                result += stringBuilder.append(c).toString();
//            }
//        }
//        return result;
    }

}
