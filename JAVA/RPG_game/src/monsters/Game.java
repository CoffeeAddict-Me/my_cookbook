package monsters;

public class Game {
    public static void main(String[] args) {
        Monster goblin = new Monster("Goblin", 100);
        System.out.println("Goblin's initial health: " + goblin.getHealth());
        System.out.println("A new monster approaches");
        Monster troll = new Monster("Troll", 250);
        System.out.println("Troll's initial health: " + troll.getHealth());
        System.out.println("Goblin fearlessly attacks the Troll! Wham!!!");

        goblin.attack(30, troll);
        System.out.println("Goblin manages to scratch the Troll");
        System.out.println("Goblin checks if the Troll is still alive... " + troll.isAlive());
        System.out.println("Troll's health plummeted to " + troll.getHealth());
        System.out.println("Now the Troll is very very angry!");
    }
}
