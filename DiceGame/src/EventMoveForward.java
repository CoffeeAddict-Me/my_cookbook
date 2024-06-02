public class EventMoveForward {

    static int moveForward(){
        System.out.println("You encountered a helpful priest who gave you additional movement.");
        Die newDieRoll = new Die();
        int rollResult = newDieRoll.rollOfTheDieResult();
        System.out.println("You rolled " + rollResult);
        return rollResult;
    }
}
