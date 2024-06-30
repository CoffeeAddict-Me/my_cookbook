public class EventHealingFountain {

    //remember to pass the player to this instance
    static void healingFountain(Player player){
        System.out.println("While you were wandering aimlessly in the forest you sumbled upon a healing fountain.");
        if(player instanceof ElfPlayer){
            player.setLife(20);
            }
        else if (player instanceof OrcPlayer){
            player.setLife(30);
        }
        else if (player instanceof HumanPlayer){
            player.setLife(25);
        }
        else if (player instanceof ZombiePlayer){
            player.setLife(25);
        }

        System.out.println("Your health has been completely restored");
    }
}
