package monsters.GPTSolution;

public class Monster {
    String name;
    int health;

    public Monster(String name, int health) {
        this.name = name;
        this.health = health;
    }

    public void takeDamage(int damage) {
        this.health -= damage; // Update the health attribute
    }

    public boolean isAlive() {
        return this.health > 0; // Directly return the condition
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHealth() {
        return health;
    }

    public void setHealth(int health) {
        this.health = health;
    }
}
