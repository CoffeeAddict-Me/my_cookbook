package collections_framework;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Objects;

public class Application {
    public static void main(String[] args) {
//        ArrayList words = new ArrayList<>();
//        words.add("hello");
//        words.add("there");
//        words.add(10);
//        words.add(9);
//        words.add(12.00);
//        words.add('H');
//
//        String item1 = (String) words.get(0); //you need to know data type to cast and retrieve the data
//        Object item2 = words.get(1);
////        Object item3 = words.get(3);
////        Object item4 = words.get(4);
////        System.out.println(item3 + item4); // this will not work because they are objects
//
//        int item3 = (int) words.get(3);
//        int item4 = (int) words.get(4);
//        System.out.println(item3 + item4); // now this will work because they are objects


        ArrayList<String> wordss = new ArrayList<>();
        wordss.add("hello");
        wordss.add("there");
        wordss.add("10");
        String item5 = wordss.get(1);
        System.out.println(item5);

        LinkedList<Integer> numbers = new LinkedList<Integer>();
        numbers.add(3);
        numbers.add(5);
        numbers.add(300);
        numbers.add(45);
        for (int number : numbers) {
            System.out.println(number);
        }

    }
}
