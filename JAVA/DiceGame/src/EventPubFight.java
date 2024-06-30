public class EventPubFight {
    static int pubFightInjury(){
        System.out.println("You walked into an inn. The bar attender smiled at you. You took a seat at the bar and started chatting with the bar attender");
        System.out.println("While absorbed by the conversation you didn't realise a fight broke out behind you");
        Die dieRoll = new Die();
        int bigBruise = dieRoll.rollOfTheDieResult();
        System.out.println("You were hit on the head and lose " + bigBruise + " of health");
        return bigBruise;
    }
}
