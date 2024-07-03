import java.util.Arrays;
import static java.lang.Integer.parseInt;

//You are given an odd-length array of integers, in which all of them are the same, except for one single number.
//
//Complete the method which accepts such an array, and returns that single different number.
//
//The input array will always be valid! (odd-length >= 3)
public class ReturnUniqueNumber {
    public static void main(String[] args) {
        int arr [] = new int[] {1, 1, 2, 1,};
        System.out.println(stray(arr));
    }

    static int stray(int[] numbers) {
    Arrays.sort(numbers);
    if(numbers[0] != numbers[1]) {
    return numbers [0];
    } else return numbers [numbers.length -1];
    }
}
