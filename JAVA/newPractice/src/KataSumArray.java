public class KataSumArray {

    public static double sum(double[] numbers) {
        double result = 0.0;
        for (int i = 0; i < numbers.length; i++) {
            result += numbers[i];
        }
        return result;
    }
}