package lunchMoney;

public class Coffee implements Spending {
    String coffeeType;
    double coffeePrice;
    double adjustedBalance;

    @Override
    public void spentMonies(double lunchPrice){
        BankBalance bankBalance = new BankBalance();
        this.adjustedBalance = bankBalance.currentBalance - lunchPrice;
    }

    public String getCoffeeType() {
        return coffeeType;
    }

    public void setCoffeeType(String coffeeType) {
        this.coffeeType = coffeeType;
    }

    public double getCoffeePrice() {
        return coffeePrice;
    }

    public void setCoffeePrice(double coffeePrice) {
        this.coffeePrice = coffeePrice;
    }
}
