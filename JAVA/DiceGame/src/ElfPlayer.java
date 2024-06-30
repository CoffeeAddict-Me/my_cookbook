import java.util.List;

public class ElfPlayer extends Player {

public ElfPlayer(String elfName){
    super();
    setName(elfName);
    setSpecies("Elf");
    setMovement(2);
    setLife(20);
    setAlive(true);
    setHasLoot(false);
    List<Loot> elfLootBag = lootBag;
    }
}
