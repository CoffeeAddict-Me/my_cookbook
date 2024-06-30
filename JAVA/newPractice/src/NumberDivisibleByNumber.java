import java.util.ArrayList;
import java.util.List;
public class NumberDivisibleByNumber {

//    Complete the function which takes two arguments and returns all numbers which are divisible by the given divisor. First argument is an array of numbers and the second is the divisor.
//
//            Example(Input1, Input2 --> Output)
//            [1, 2, 3, 4, 5, 6], 2 --> [2, 4, 6]

    public static int[] divisibleBy(int[] numbers, int divider) {
        List <Integer> resultList = new ArrayList<>();

        for(int i = 0; i < numbers.length; i++){

            if(numbers[i] % divider == 0){
                resultList.add(numbers[i]);
            }
        }
        return resultList.stream().mapToInt(Integer::intValue).toArray();

    }

    public static void main(String[] args) {
        int[] result = divisibleBy(new int[]{1, 2, 3, 4, 5, 6}, 2);
        for (int num : result) {
            System.out.print(num + " ");
        }
    }

}
