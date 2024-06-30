public class EventYouDied {
    static void youWereKilled(Player player){
        System.out.println("You encountered a band of playful ferries. They wanted to play with you, but you didn't know the rules.");
        System.out.println("You were exhausted from chasing them. You decided to take a quick nap in the nearby cave.");
        System.out.println("You should have known better...");
        System.out.println("You were eaten by a troll who lives in the cave.");
        player.setAlive(false);
    }
}
