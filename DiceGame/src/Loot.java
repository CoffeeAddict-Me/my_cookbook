
public class Loot {
    public static final Loot HEALING_POTION = new Loot("Healing Potion");
    public static final Loot BROKEN_SHIELD = new Loot("Broken Shield");
    public static final Loot DULL_SWORD = new Loot("Dull Sword");
    public static final Loot GOLD_COIN = new Loot("Gold Coin");
    public static final Loot COPPER_COIN = new Loot("Copper Coin");
    public static final Loot SHOE_STRING = new Loot("Shoe String");
    public static final Loot STICKY_GOO = new Loot("Sticky Goo");
    public static final Loot FLYING_CARPET = new Loot("Flying Carpet");
    public static final Loot UNKNOWN_POTION = new Loot("Unknown Potion");

    private String itemName;

    private Loot(String itemName) {
        this.itemName = itemName;
    }

    public String getItemName() {
        return itemName;
    }
}
