package monsters.ehnanced;

import monsters.Monster;

public class Troll extends Monster {
    public Troll(String name, int health) {
        super(name, health);
    }
public void regenerate (int healthRegenerated){
        this.health += healthRegenerated;
}
}


