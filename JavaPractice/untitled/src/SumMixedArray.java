//Given an array of integers as strings and numbers, return the sum of the array values as if all were numbers.
//
//Return your answer as a number.

import java.util.ArrayList;
import java.util.List;

import static java.lang.Character.isDigit;
import static java.lang.Integer.parseInt;

public class SumMixedArray {
    public static void main(String[] args) {
        List<Object> mixed = new ArrayList<>() {{
            add(1);
            add("1");
            add(4);
            add("3");
        }};

        System.out.println(sums(mixed));
    }

    public static int sums(List<?> mixed) {

        int total = mixed.stream()
                .mapToInt(num -> {
                    if (num instanceof Integer) {
                        return (Integer) num;
                    } else {
                        return Integer.parseInt((String) num);
                    }
                })
                .sum();

        return total;
    }
}
