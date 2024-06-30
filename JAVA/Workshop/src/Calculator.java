import java.math.BigDecimal;

public class Calculator {

    public BigDecimal addition(BigDecimal num1, BigDecimal num2){
        BigDecimal result = num1.add(num2);
        return result;
    };
    public BigDecimal subtraction(BigDecimal num1, BigDecimal num2){
        BigDecimal result = num1.subtract(num2);
        return result;
    };

    public BigDecimal multiplication(BigDecimal num1, BigDecimal num2){
        BigDecimal result = num1.multiply(num2);
        return result;
    };

    public BigDecimal division(BigDecimal num1, BigDecimal num2){
        BigDecimal result = num1.divide(num2);
        return result;
    };

}
