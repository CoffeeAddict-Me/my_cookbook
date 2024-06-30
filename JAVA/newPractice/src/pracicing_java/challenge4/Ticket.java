package pracicing_java.challenge4;

public class Ticket {
    public Ticket() {

    }

    private String destination;
    private double price;
    private boolean isReturn;
    // Add three methods to set the value of each field, called setDestination,
    // setPrice and setIsReturn.

    // Add a separate method to get the value of each field, called getDestination,
    // getPrice and getIsReturn.
    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isReturn() {
        return isReturn;
    }

    public void setReturn(boolean aReturn) {
        isReturn = aReturn;
    }




}
