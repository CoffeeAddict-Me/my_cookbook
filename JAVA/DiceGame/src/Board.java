import java.util.Scanner;

public class Board {

    static int currentPosition = 0;
    static int finishingPosition = 42;

    public static void main(String[] args) {
        System.out.println("Welcome to your big adventure");
        Scanner scanner = new Scanner(System.in);
        System.out.println("To begin please chose your race. Pick a number corresponding to the race you prefer.");
        System.out.println("1. Elf");
        System.out.println("2. Human");
        System.out.println("3. Orc");
        System.out.println("4. Zombie");
        int raceChoice = scanner.nextInt();

        System.out.println("You chose " + raceChoice);
        System.out.println("Please provide your name");
        scanner.nextLine();
        String playerName = scanner.nextLine();

        //that's you, you are the new player
        Player player = new Player();

        switch (raceChoice){
            case 1:
                player = new ElfPlayer(playerName);
                player.setName(playerName);
                break;
            case 2:
                player = new HumanPlayer(playerName);
                player.setName(playerName);
                break;
            case 3:
                player = new OrcPlayer(playerName);
                player.setName(playerName);
                break;
            case 4:
                player = new ZombiePlayer(playerName);
                player.setName(playerName);
                break;
            default:
                System.out.println("No such race");
                System.exit(0);
        }
        System.out.println("Welcome " + playerName + " the " + player.getSpecies());
        System.out.println("To begin your journey please roll the dice. To roll press R");

        String rollTheDie = scanner.next().toUpperCase();
        System.out.println("You pressed " + rollTheDie);

        while(rollTheDie.equals("R") || rollTheDie.equals ("r")){

            int currentHealth = player.getLife();
            boolean isAlive = player.isAlive;
            int playerMovement = player.getMovement();
            Die dieRoll = new Die();

            int rollResult = dieRoll.rollOfTheDieResult();
            System.out.println("You rolled " + rollResult);
            currentPosition += rollResult * playerMovement;
            System.out.println("Your current position is " + currentPosition + " out of 42.");

            //encounters
            //brand new die for events
            Die eventDie = new Die();
            int eventRoll = eventDie.rollOfTheDieResult();

            if (currentPosition >= finishingPosition){
                System.out.println("Congratulations! You Won!");
                break;

            }

            switch (eventRoll){
                case 1:
                    EventHealingFountain foundFountain = new EventHealingFountain();
                    foundFountain.healingFountain(player);
                    System.out.println("Your current health is " + player.getLife());
                    break;
                case 2:
                    currentPosition = currentPosition - EventMoveBackwards.moveBackwards();
                    currentPosition = (currentPosition < 0) ? 0 : currentPosition;
                    System.out.println("Your current position is " + currentPosition);
                    break;
                case 3:
                    currentPosition = currentPosition + EventMoveForward.moveForward();
                    System.out.println("Your current position is " + currentPosition);
                    if (currentPosition >= finishingPosition){
                        System.out.println("You won! Thank you for playing");
                        System.exit(0);
                    }
                    break;

                case 4:
                    currentHealth = currentHealth - EventTrap.foundTrap();
                    System.out.println("Your current health is " + currentHealth);

                    break;
                case 5:
                    currentHealth = currentHealth - EventPubFight.pubFightInjury();
                    System.out.println("After the fight your health is " + currentHealth);
                    break;
                case 6:
                    EventYouDied.youWereKilled(player);
                    System.out.println("Oh you died!");
                    System.out.println("Thank you for playing! ;)");
                    System.exit(0);
                    break;


            }
            switch (currentPosition){
                case 10:
                    player.addToLootBag(Loot.HEALING_POTION);
                    System.out.println("You found a healing potion! Yay! You promptly drink it and gain 1HP");
                    currentHealth = currentHealth + 1;
                    break;
                case 15:
                    player.addToLootBag(Loot.BROKEN_SHIELD);
                    System.out.println("You found a broken shield, it's heavy.");
                    break;
                case 18:
                    player.addToLootBag(Loot.GOLD_COIN);
                    System.out.println("You found a gold coin! You are rich!");
                    break;
                case 20:
                    player.addToLootBag(Loot.COPPER_COIN);
                    System.out.println("You found copper coin... well, better than nothing");
                    break;
                case 22:
                    player.addToLootBag(Loot.STICKY_GOO);
                    System.out.println("You found sticky goo... it's sticky");
                    break;
                case 25:
                    player.addToLootBag(Loot.DULL_SWORD);
                    System.out.println("You found a dull sword... it's dull and it's a sword");
                    break;
                case 31:
                    player.addToLootBag(Loot.FLYING_CARPET);
                    System.out.println("You found flying carpet! Woohoo! You exit the dungeon");
                    currentPosition = finishingPosition;
                    break;
                case 33:
                    player.addToLootBag(Loot.SHOE_STRING);
                    System.out.println("You found a shoe string, it's a shoe string.");
                    break;
                case 41:
                    player.addToLootBag(Loot.UNKNOWN_POTION);
                    System.out.println("You found an unknown potion. Looks like a healing potion. You promptly drink it");
                    System.out.println("Uh oh.... You're not feeling too well");
                    System.out.println("You die... it wasn't a healing potion after all");
                    currentHealth = 0;
                    isAlive = false;
                    break;
            }

            //checking if still alive and well and wants to continue
            if(currentPosition >= finishingPosition){
                System.out.println("You made it to the end! Congratulations!");
                break;
            }

            else if (!isAlive || currentHealth < 1){
                System.out.println("You died! How unfortunate!");
                break;
            }
            System.out.println("To continue your journey, please roll the dice. To roll press R");
            rollTheDie = scanner.next().toUpperCase();
            if (!rollTheDie.equals("R")) {
                System.out.println("Exiting the game. Goodbye!");
                System.exit(0);
        }

        }
    }
}
