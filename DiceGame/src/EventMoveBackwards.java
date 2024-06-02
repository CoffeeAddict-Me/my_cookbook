public class EventMoveBackwards {
    static int moveBackwards(){
        System.out.println("You encountered a wicked goblin who gave you wrong directions.");
        Die newDieRoll = new Die();
        int rollResult = newDieRoll.rollOfTheDieResult();
        System.out.println("You rolled " + rollResult + ". You move backwards " + rollResult + " steps.");
        return rollResult;
    }
}
