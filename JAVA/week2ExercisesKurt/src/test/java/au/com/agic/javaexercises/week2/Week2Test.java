package au.com.agic.javaexercises.week2;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

public class Week2Test {

    private static Week2 week2;

    @BeforeAll
    static void init() {
        week2 = new Week2();
    }

    @Test
    @DisplayName("Sum of doubles - empty array")
    void testSumOfDoublesPrimitive1() {
        final double[] vals = {};
        final double sum = week2.sumOf(vals);
        assertEquals(0, sum);
    }

    @Test
    @DisplayName("Sum of doubles - single element array")
    void testSumOfDoublesPrimitive2() {
        final double[] vals = {1.5};
        final double sum = week2.sumOf(vals);
        assertEquals(1.5, sum);
    }

    @Test
    @DisplayName("Sum of doubles - multiple element array")
    void testSumOfDoublesPrimitive3() {
        final double[] vals = {1.5, 5.0, 3.2};
        final double sum = week2.sumOf(vals);
        assertEquals(9.7, sum);
    }

    @Test
    @DisplayName("Even only ints - empty array")
    void testEvenOnlyInt1() {
        final int[] vals = {};
        final int[] evens = week2.evenOnly(vals);
        assertArrayEquals(vals, evens);
    }

    @Test
    @DisplayName("Even only ints - single even array")
    void testEvenOnlyInt2() {
        final int[] vals = {2};
        final int[] evens = week2.evenOnly(vals);
        assertArrayEquals(vals, evens);
    }

    @Test
    @DisplayName("Even only ints - single odd array")
    void testEvenOnlyInt3() {
        final int[] vals = {1};
        final int[] evens = week2.evenOnly(vals);
        assertArrayEquals(new int[]{}, evens);
    }

    @Test
    @DisplayName("Even only ints - mixed array")
    void testEvenOnlyInt4() {
        final int[] vals = {1, 2, 3, 4};
        final int[] evens = week2.evenOnly(vals);
        assertArrayEquals(new int[]{2, 4}, evens);
    }


    @Test
    @DisplayName("Sum of doubles - empty array")
    void testSumOfIntegers1() {
        final List<Integer> vals = List.of();
        final double sum = week2.sumOf(vals);
        assertEquals(0, sum);
    }

    @Test
    @DisplayName("Sum of doubles - single element array")
    void testSumOfIntegers2() {
        final List<Integer> vals = List.of(1);
        final Integer sum = week2.sumOf(vals);
        assertEquals(1, sum);
    }

    @Test
    @DisplayName("Sum of doubles - multiple element array")
    void testSumOfIntegers3() {
        final List<Integer> vals = List.of(1, 2, 3);
        final Integer sum = week2.sumOf(vals);
        assertEquals(6, sum);
    }


    @Test
    @DisplayName("Even only Integers - empty list")
    void testEvenOnlyIntegers1() {
        final List<Integer> vals = List.of();
        final List<Integer> evens = week2.evenOnly(vals);
        assertEquals(vals, evens);
    }

    @Test
    @DisplayName("Even only Integers - single even list")
    void testEvenOnlyIntegers2() {
        final List<Integer> vals = List.of(2);
        final List<Integer> evens = week2.evenOnly(vals);
        assertEquals(vals, evens);
    }

    @Test
    @DisplayName("Even only Integers - single odd array")
    void testEvenOnlyIntegers3() {
        final List<Integer> vals = List.of(3);
        final List<Integer> evens = week2.evenOnly(vals);
        assertEquals(List.of(), evens);
    }

    @Test
    @DisplayName("Even only Integers - mixed array")
    void testEvenOnlyIntegers4() {
        final List<Integer> vals = List.of(1, 2, 3, 4);
        final List<Integer> evens = week2.evenOnly(vals);
        assertEquals(List.of(2, 4), evens);
    }

    @Test
    @DisplayName("Fibonacci - 1")
    void testFibonacci1() {
        final List<Integer> fibonacci = week2.fibonacci(1);
        assertEquals(List.of(0), fibonacci);
    }

    @Test
    @DisplayName("Fibonacci - 5")
    void testFibonacci2() {
        final List<Integer> fibonacci = week2.fibonacci(5);
        assertEquals(List.of(0, 1, 1, 2, 3), fibonacci);
    }

    @Test
    @DisplayName("String ends with empty string")
    void testEndsWith1() {
        final String testStr = "test string";
        final String endStr = "";
        final Boolean endsWith = week2.endsWith(testStr, endStr);
        assertTrue(endsWith);
    }

    @Test
    @DisplayName("String ends with valid ending")
    void testEndsWith2() {
        final String testStr = "test string";
        final String endStr = "string";
        final Boolean endsWith = week2.endsWith(testStr, endStr);
        assertTrue(endsWith);
    }

    @Test
    @DisplayName("String ends with invalid ending")
    void testEndsWith3() {
        final String testStr = "test string";
        final String endStr = " sTrInG";
        final Boolean endsWith = week2.endsWith(testStr, endStr);
        assertFalse(endsWith);
    }

    @ParameterizedTest()
    @DisplayName("Palindrome - string with spaces is Palindrome")
    @MethodSource("provideValuesForPalindrome")
    void testPalindrome4(final String testStr, final boolean expected) {
        assertEquals(expected, week2.isPalindrome(testStr));
    }

    private static Stream<Arguments> provideValuesForPalindrome() {
        return Stream.of(
                Arguments.of("", true),
                Arguments.of(" ", true),
                Arguments.of("  ", true),
                Arguments.of("   ", true),
                Arguments.of("a a", true),
                Arguments.of("a a ", true),
                Arguments.of(" a a", true),
                Arguments.of("ab ba ", true),
                Arguments.of(" ab ba", true),
                Arguments.of(" ab ba ", true),
                Arguments.of("abcab", false),
                Arguments.of("abcabc", false),
                Arguments.of("a\tbcba", true)
        );
    }

    // Create as many tests as necessary to
    // validate the sort
    @Test
    void testBubbleSort() {

    }
}
