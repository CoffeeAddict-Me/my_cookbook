package lunchMoney;

import java.util.Scanner;

public class BankBalance {
    double currentBalance = 100.00;

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("Did you have lunch? \nY/N");
        String answer = scanner.next();
        if (answer.equals("Y") | answer.equals("y")){
            Lunch lunch = new Lunch();
            System.out.println("What did you have?");
            String yummy = scanner.nextLine();
            scanner.nextLine();
            lunch.setLunchMeal(yummy);
            System.out.println("How much was it?");
            double lunchCost = scanner.nextDouble();
            lunch.setLunchPrice(lunchCost);
            System.out.println("You had " + yummy + " for $" + lunchCost);

            lunch.spentMonies(lunchCost);
            System.out.println("Adjusted balance: $" + lunch.adjustedBalance);

            System.out.println("Did you have coffee? \nY/N");
            String answerMe = scanner.next();
            if (answerMe.equals("Y")|answerMe.equals("y")){
                Coffee coffee = new Coffee();
                System.out.println("What did you have?");
                String yummyCoffee = scanner.nextLine();
                scanner.nextLine();
                coffee.setCoffeeType(yummyCoffee);
                System.out.println("How much was it?");
                double coffeeCost;
                coffeeCost = scanner.nextDouble();
                coffee.setCoffeePrice(coffeeCost);
                System.out.println("You had " + yummyCoffee + " for $" + coffeeCost);
                coffee.spentMonies(coffeeCost);
                double bigSpender = coffeeCost + lunchCost;
                double lastBalance = lunch.adjustedBalance - coffeeCost;
                System.out.println("Today you spent $"+ bigSpender + " on " + yummy + " and " +yummyCoffee +". you have $" + lastBalance + " left.");
            } else if (answerMe.equals("N")|answerMe.equals("n")) {
                System.out.println("Today you spent $" + lunchCost + " on " + yummy + ". Balance left of your monies is $" + lunch.adjustedBalance);

            }

        } else if (answer.equals("N") | answer.equals("n")){
            System.out.println("Did you have coffee? \nY/N");
            String answerCoffee = scanner.next();
            if(answerCoffee.equals("Y")){
                Coffee coffee = new Coffee();
                System.out.println("What did you have?");
                String yummyCoffee = scanner.nextLine();
                scanner.nextLine();
                coffee.setCoffeeType(yummyCoffee);
                System.out.println("How much was it?");
                double coffeeCost = scanner.nextDouble();
                coffee.setCoffeePrice(coffeeCost);
                System.out.println("You had " + yummyCoffee + " for $" + coffeeCost);
                coffee.spentMonies(coffeeCost);
                System.out.println("Adjusted balance: $" + coffee.adjustedBalance);
            }
            else {
                System.out.println("You must have answered incorrectly");
            }

        } else {
            System.out.println("You must have answered incorrectly");
        }


        }
    }


