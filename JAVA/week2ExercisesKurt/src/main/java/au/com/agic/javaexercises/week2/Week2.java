package au.com.agic.javaexercises.week2;

import static java.util.Collections.swap;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

class Week2 {

    double sumOf(final double[] vals) {
        double result = 0;
        if (vals != null){
            for (double val : vals){
                result += val;

            }
        } else {
            result = 0;
        }
        // Calculate the sum of the vals
        // If there are no values return 0.0
        return result;
    }

    int[] evenOnly(final int[] vals) {
        // Return an array with only even values
        // The array must be the same size as the
        // number of even values
        ArrayList<Integer> integerArrayList = new ArrayList<>();
        for (int i = 0; i < vals.length; i++) {
            if(Integer.valueOf(vals[i]) % 2 == 0){
                integerArrayList.add(vals[i]);
            }
        }
        int[] resultsArray = integerArrayList.stream()
                .mapToInt(Integer::intValue)
                .toArray();
        return resultsArray;
    }

    Integer sumOf(final List<Integer> vals) {
        // Calculate the sum of the vals
        // Make use of Java's boxing/unboxing to simplify
        return vals.stream()
                .mapToInt(Integer::intValue)
                .sum();
    }

    List<Integer> evenOnly(final List<Integer> vals) {

        // Return a List with only even values
        return vals.stream().filter(val -> (val%2 == 0))
                .toList();
    }

    List<Integer> fibonacci(final int num) {
        // Return the first num Fibonacci numbers
        // using a loop type of your choice
        // You can assume num will be
        // a positive non-zero number.
        // The sequence starts at 0
        // e.g. num == 4 => 0, 1, 1, 2
        List<Integer> result = new ArrayList<>();
        if (num >= 1) {
            result.add(0);
        }
        if (num >= 2){
            result.add(1);
        }

        for(int i = 2; i < num; i++){
            int nextFib = result.get(i-1) + result.get(i-2);
            result.add(nextFib);
        }

        return result;

    }

    Boolean endsWith(final String stringToSearch, final String endingString) {
        // Determine whether stringToSearch ends with the string endingString
        // Note you are not allowed to use the method endsWith();
        return null;
    }

    Boolean isPalindrome(final String words) {
        // A Palindrome can be a single word or
        // a sentence. If it is a sentence you need to ignore
        // spaces.
        // An empty string or one with a single character
        // is also a palindrome.
        return null;
    }

    // Sorts by putting the largest value at the end
    // then iterates with the next largest and so on.
    // This results in the sorted values growing from
    // the end of the array towards the start.
    //
    // You are to write tests to validate that this
    // bubble sort algorithm is correct.
    void bubbleSort(final int[] vals) {
        boolean swapped;

        // 'i' controls the end index for each iteration
        // of the inner loop; marks the end - 1
        // of the unsorted portion of the array.
        for (int i = 0; i < vals.length; i++) {
            swapped = false;
            // Iterate from the start, ending at the
            // index - 1 of the end of the unsorted
            // portion of the array.
            for (int j = 0; j < vals.length - i - 1; j++) {
                if (isSwapRequired(vals, j)) {
                    swap(vals, j);
                    swapped = true;
                }
            }
            // If nothing was swapped we have finished.
            if (!swapped) {
                break;
            }
        }
    }

    private boolean isSwapRequired(final int[] vals, final int j) {
        return vals[j] > vals[j + 1];
    }

    private void swap(final int[] vals, final int j) {
        final int temp = vals[j + 1];
        vals[j + 1] = vals[j];
        vals[j] = temp;
    }


}
