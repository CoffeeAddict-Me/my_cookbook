package monsters;

public class Goblin extends Monster {


    public Goblin(String name, int health) {
        super(name, health);
    }

    public static void main(String[] args) {
        Monster goblin = new Monster("Goblin",  100);
        goblin.takeDamage(30);
        System.out.println(goblin.isAlive());
        goblin.takeDamage(80);
        System.out.println(goblin.isAlive());
    }

}
