package monsters.ehnanced;

import monsters.Monster;

public class Goblin extends Monster {


    public Goblin(String name, int health) {
        super(name, health);

    }
    public void steal(Monster monster, int healthStolen){
            monster.health -= healthStolen;
            this.health += healthStolen;
    }
}