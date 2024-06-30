package floofiness;

public class LittleFloof {
    String floof;
    String floofName;
    int floofAge;
    String floofGender;

    public LittleFloof(String type, String name, int age, String gender){
        floof = type;
        floofName = name;
        floofAge = age;
        floofGender = gender;

    }
    public static void main(String[] args) {
        LittleFloof scotty = new LittleFloof("Cat", "Scotty", 8, "boy");
        LittleFloof beemo = new LittleFloof("Cat", "Beemo", 9, "boy");
        LittleFloof juno = new LittleFloof("Doggo", "Juno", 9, "girl");
        LittleFloof olive = new LittleFloof("Doggo", "Olive", 9, "girl");
        LittleFloof butch = new LittleFloof("Doggo", "Butch", 7, "girl");

        System.out.println("My cat's name is " + scotty.floofName);
        System.out.println("Anna's floof's name is " + beemo.floofName);
        boolean isOlder = juno.floofAge> butch.floofAge;
        System.out.println("Juno is older than Butch - " + isOlder);
    }

}
