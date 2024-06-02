import java.util.List;

public class OrcPlayer extends Player {

    public OrcPlayer(String orcName) {
        super();
        setName(orcName);
        setSpecies("Orc");
        setMovement(1);
        setLife(30);
        setAlive(true);
        setHasLoot(false);
        List<Loot> orcLootBag = lootBag;
    }
}
