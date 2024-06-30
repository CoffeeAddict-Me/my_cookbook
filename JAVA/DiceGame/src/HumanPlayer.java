import java.util.List;

public class HumanPlayer extends Player {
    public HumanPlayer(String humanName) {
        super();
        setName(humanName);
        setSpecies("Human");
        setMovement(1);
        setLife(25);
        setAlive(true);
        setHasLoot(false);
        List<Loot> humanLootBag = lootBag;
    }
}
