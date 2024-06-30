import java.util.List;
import java.util.ArrayList;
public class CountTheMonkeys {
//    You take your son to the forest to see the monkeys. You know that there are a certain number there (n), but your son is too young to just appreciate the full number, he has to start counting them from 1.
//    As a good parent, you will sit and count with him. Given the number (n), populate an array with all numbers up to and including that number, but excluding zero.
//    For example(Input --> Output):
//            10 --> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//            1 --> [1]

    public static int[] monkeyCount(final int n){
        List <Integer> monkeyList = new ArrayList<>();
        for (int i = 1; i<=n; i++){
            monkeyList.add(i);
        }
        return monkeyList.stream().mapToInt(Integer::intValue).toArray();
    }
// the printout is slightly modified to list monkeys
    public static void main(String[] args) {
        int[] result = monkeyCount(15);
        for(int num : result){
            System.out.println("monkey: " + num);
        }
    }
}
