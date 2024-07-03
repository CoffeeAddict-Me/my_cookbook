//Complete the function that takes two integers (a, b, where a < b) and return an array of all integers between the input parameters, including them.
//
//For example:
//
//a = 1
//b = 4
//        --> [1, 2, 3, 4]


import java.util.Arrays;

import static java.util.stream.IntStream.rangeClosed;

public class ArrayBetweenNumbers {
    public static void main(String[] args) {
        int a = 1;
        int b = 4;

        System.out.println(Arrays.toString(between(a, b)));
    }

    public static int[] betweenTwo(int a, int b) {
        int arr [] = new int [b - a+1];
        for (int i = 0; i <= (b-a); i++) {
            arr[i] = a+i;
        }
        return arr;
    }

    static int[] between(int a, int b) {
        return rangeClosed(a, b).toArray();
    }

}
