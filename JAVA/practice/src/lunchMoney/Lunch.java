package lunchMoney;

public class Lunch implements Spending {
    String lunchMeal;
    double lunchPrice;
    double adjustedBalance;

    @Override
    public void spentMonies(double lunchPrice){
        BankBalance bankBalance = new BankBalance();
        this.adjustedBalance = bankBalance.currentBalance - lunchPrice;
    }

    public String getLunchMeal() {
        return lunchMeal;
    }

    public void setLunchMeal(String lunchMeal) {
        this.lunchMeal = lunchMeal;
    }

    public double getLunchPrice() {
        return lunchPrice;
    }

    public void setLunchPrice(double lunchPrice) {
        this.lunchPrice = lunchPrice;
    }
}
