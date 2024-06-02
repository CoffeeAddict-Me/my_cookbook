public class EventTrap {
    static int foundTrap(){
        System.out.println("You encountered fell into a trap!");
        Die newDieRoll = new Die();
        int rollResult = newDieRoll.rollOfTheDieResult();
        System.out.println("You rolled " + rollResult + ". You lost " + rollResult + " of your life.");
        return rollResult;
    }
}
