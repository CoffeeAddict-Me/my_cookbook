import java.util.ArrayList;
import java.util.List;

public class PowerOfTwo {
    public static long[] powersOfTwo(int n){
        List <Integer> result = new ArrayList<>();

            for (int i = 1; i < n; i++) {
                result.add((int) Math.pow(2, i));


            }

        //TODO: Have fun
        return new long[result.stream().flatMapToLong(Integer::longValue).toArray()];
    }
}
