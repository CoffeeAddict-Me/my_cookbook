public class Customer extends Person {

   private int cash;
    private boolean creditRatingGood;

    public Customer() {
    }

    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    public boolean isCreditRatingGood() {
        return creditRatingGood;
    }

    public void setCreditRatingGood(boolean creditRatingGood) {
        this.creditRatingGood = creditRatingGood;
    }
}
