public class Die {
    public int dieSide;

    public int rollOfTheDieResult(){
        int min = 1;
        int max = 6;
        int range = max - min + 1;
        dieSide = (int)(Math.random()*range)+min;
        return dieSide;
    }
//checking if the method works
//    public static void main(String[] args) {
//        Die die = new Die();
//        int result = die.rollOfTheDieResult();
//        System.out.println(result);
//    }
}
