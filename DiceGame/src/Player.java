import java.util.ArrayList;
import java.util.List;

public class Player {
    String name;
    String species;
    int movement;
    int life;
    boolean isAlive;
    boolean hasLoot;

    List<Loot> lootBag = new ArrayList<>();

    public List<Loot> getLootBag() {
        return lootBag;
    }
    public void addToLootBag(Loot lootItem){
        lootBag.add(lootItem);
    }

    public void setLootBag(List<Loot> lootBag) {
        this.lootBag = lootBag;
    }

    public List<Loot> checkLootBag (){
        return lootBag;
    }

    public int getLife() {
        return life;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLife(int life) {
        this.life = life;
    }

    public boolean isAlive() {
        return isAlive;
    }

    public void setAlive(boolean alive) {
        isAlive = alive;
    }

    public boolean isHasLoot() {
        return hasLoot;
    }

    public void setHasLoot(boolean hasLoot) {
        this.hasLoot = hasLoot;
    }



    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public int getMovement() {
        return movement;
    }

    public void setMovement(int movement) {
        this.movement = movement;
    }
}
