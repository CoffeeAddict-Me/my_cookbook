//Given a string, you have to return a string in which each character (case-sensitive) is repeated once.
//
//Examples (Input -> Output):
//        * "String"      -> "SSttrriinngg"
//        * "Hello World" -> "HHeelllloo  WWoorrlldd"
//        * "1234!_ "     -> "11223344!!__  "

public class DuplicateCharacterInString {
    public static void main(String[] args) {
        String s = "Awesome";
        System.out.println(doubleChar(s));
    }

    public static String doubleChar(String s){
        StringBuilder stringBuilder = new StringBuilder();

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            stringBuilder.append(c).append(c);
        }

        return stringBuilder.toString();
    }
}
