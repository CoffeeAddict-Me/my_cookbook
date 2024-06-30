public class Dealership {
    public static void main(String[] args) {
        Initialisation initial = new Initialisation();

        Vehicle redCar = initial.initialiseRedCar();
        Vehicle blackCar = initial.initialiseBlacCar();
        Customer customerJoe =  initial.initialiseCustomerJoe();
        Customer customerMike = initial.initialiseCustomerMike();
        Customer customerDon = initial.initialiseCustomerDon();
        Employee manager = initial.initialiseManager();
        Employee employee = initial.initialiseEmployee();


        handleCustomer(customerJoe, true, redCar);
        handleCustomer(customerMike, false, blackCar);
        handleCustomer(customerDon, true, blackCar);
    }

    public static void handleCustomer(Customer customer, boolean finance, Vehicle vehicle) {
        if(finance) {
            runCreditHistory(customer);
            if (runCreditHistory(customer)){
                processTransaction(vehicle, customer);
            } else {
                transactionDenied(vehicle, customer);
            }
            }
        else if (vehicle.getPrice() <= customer.getCash()) {
            processTransaction(vehicle, customer);
        } else {
            transactionDenied(vehicle, customer);
        }
    }

    public static boolean runCreditHistory(Customer customer) {
        if (customer.isCreditRatingGood()) {
            return true;
        } else {
            return false;
        }
    }

    public static void transactionDenied(Vehicle vehicle, Customer customer) {
        System.out.println(customer.getName() + " couldn't afford to buy " + vehicle.colour + " " + vehicle.make + " " + vehicle.model);
    }

    public static void processTransaction(Vehicle vehicle, Customer customer){
        System.out.println(customer.name + " bought " + vehicle.colour + " " + vehicle.make + " " + vehicle.model);
    }
}
