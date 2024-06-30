import java.util.List;

public class ZombiePlayer extends Player{

    public ZombiePlayer(String zombieName) {
        super();
        setName(zombieName);
        setSpecies("Zombie");
        setMovement(2);
        setLife(25);
        setAlive(true);
        setHasLoot(false);

        List<Loot> zombieLootBag = lootBag;
    }
}
