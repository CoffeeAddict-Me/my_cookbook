package monsters.GPTSolution;

public class Game {
        public static void main(String[] args) {
            Monster goblin = new Monster("Goblin", 100);
            System.out.println("Goblin's initial health: " + goblin.getHealth());

            goblin.takeDamage(30);
            System.out.println("Is Goblin alive after 30 damage? " + goblin.isAlive());
            System.out.println("Goblin's health after 30 damage: " + goblin.getHealth());

            goblin.takeDamage(80);
            System.out.println("Is Goblin alive after another 80 damage? " + goblin.isAlive());
            System.out.println("Goblin's health after another 80 damage: " + goblin.getHealth());


        }
}
