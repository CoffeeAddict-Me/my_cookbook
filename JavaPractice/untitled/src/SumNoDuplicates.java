
//Please write a function that sums a list, but ignores any duplicated items in the list.
//
//For instance, for the list [3, 4, 3, 6] the function should return 10,
//and for the list [1, 10, 3, 10, 10] the function should return 4.


import java.util.Arrays;

public class SumNoDuplicates {
    public static void main(String[] args) {
        int arr [] = new int[] {1, 1, 2, 3,};
        System.out.println(sumNoDuplicates(arr));
    }
    public static int sumNoDuplicatesTwo(int[] arr){
        return Arrays.stream(arr).distinct().sum();
    }

    public static int sumNoDuplicates(int[] arr){
        int sum = 0;

        for (int i = 0; i < arr.length; i++){
            int num = arr[i];
            int x = 0;
            for(int j = 0; j < arr.length; j++){
                if (arr[j] == num)
                    x++;
            }
            if (x <= 1)
                sum += num;
        }
        return sum;
    }


}
