public class Initialisation {

    public static Customer initialiseCustomerJoe() {
        Customer customerJoe = new Customer();
        customerJoe.setName("Joe");
        customerJoe.setLastname("Doe");
        customerJoe.setCash(10000);
        customerJoe.setCreditRatingGood(true);
        return customerJoe;
    }

    public static Vehicle initialiseBlacCar() {
        Vehicle blackCar = new Vehicle();
        blackCar.colour = "black";
        blackCar.make = "Volkswagen";
        blackCar.model = "Golf";
        blackCar.price = 15000;
        return blackCar;
    }

    public static  Vehicle initialiseRedCar() {
        Vehicle redCar = new Vehicle();
        redCar.colour = "red";
        redCar.make = "Toyota";
        redCar.model = "Corolla";
        redCar.price = 16000;
        return redCar;
    }

    public static Customer initialiseCustomerMike() {
        Customer customerMike = new Customer();
        customerMike.setName("Mike");
        customerMike.setLastname("Tyson");
        customerMike.setGender("male");
        customerMike.setCash(20000000);
        customerMike.setCreditRatingGood(false);
        return customerMike;
    }
    public static Customer initialiseCustomerDon() {
        Customer customerDon = new Customer();
        customerDon.setName("Don");
        customerDon.setLastname("Johnson");
        customerDon.setGender("male");
        customerDon.setCash(8000);
        customerDon.setCreditRatingGood(false);
        return customerDon;
    }


    public static Employee initialiseManager(){
        Employee manager = new Employee();
        manager.name = "Bobby";
        manager.lastname = "Brown";
        manager.role = "manager";
        return manager;
    }

    public static Employee initialiseEmployee(){
        Employee employee = new Employee();
        employee.name = "Florence";
        employee.lastname = "Smith";
        employee.role = "retail assistant";
        return employee;
    }
}
