package monsters.ehnanced;

public class Game {

    public static void main(String[] args) {
        Goblin goblin = new Goblin("Whacker", 80);
        Troll troll = new Troll("Smacker", 100);

        System.out.println("Whacker was walking through the woods minding his own business");
        System.out.println("His full health at " + goblin.health + ". Feeling alive!" + goblin.isAlive());
        System.out.println("Suddenly behind Whacker, Smacker appeared!");
        System.out.println("Smacker was in his prime form with health at " + troll.health + ". He was feeling very alive " + troll.isAlive());

        System.out.println("Smacker attacked startled Whacker.... WHAM! Smacked him on the head!");
        troll.attack(20, goblin);
        System.out.println("Whacker was hurt quite badly and his health as his health plummented to " + goblin.health);
        System.out.println("Whacker quickly checked if he was still alive " + goblin.isAlive());
        System.out.println("Then took his whacky stick and whacked the troll in the knee cap! Whack!");
        goblin.attack(15, troll);
        System.out.println("Smacker's knee hurt badly and his health plumenttd to " + troll.health);
        System.out.println("Smacker decided to smack Whacker again for a good measure");
        troll.attack(15, goblin);
        System.out.println("Whacker quickly checked if he was still alive " + goblin.isAlive());
        System.out.println("Whacker was very hurt as his health plummeted even further to " + goblin.health);
        System.out.println("He quickly casted Steal on Smacker");
        goblin.steal(troll, 15);
        System.out.println("and his health increased to " + goblin.getHealth());
        System.out.println("Smacker realised that it was almost lunchtime decided to leave the poor Whacker alone");
        System.out.println("As he was leaving he casted Regenerate");
        troll.regenerate(30);
        System.out.println("And his health increased to " + troll.health);
    }
}
