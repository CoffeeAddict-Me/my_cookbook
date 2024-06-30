import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        ArrayList<String> songList = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        songList.add("Hungry Like the Wolf, Duran Duran");
        songList.add("Who Let The Dogs Out, Baha Men");
        songList.add("Crocodile Rock, Elton John");
        songList.add("What's New Pussycat, Tom Jones");
        songList.add("Little Lion Man, Mumford & Sons");
        songList.add("I Am The Walrus, The Beatles");
        songList.add("I'm Like A Bird, Nelly Furtado");
        songList.add("Rock Lobster, The B-52’s");
        songList.add("The Horses, Daryl Braithwaite");

        System.out.println("Press s for shuffle or p for play or a for add a new song or d to delete last song");

        String choice = scanner.next().toLowerCase();
        if (choice.equals("s")) {
            shuffle(songList);

        } else if (choice.equals("p")) {
            for (String song : songList) {
            System.out.println(songList.indexOf(song)+ " " + song);
            }
        } else if (choice.equals("a")){
            addSong(scanner, songList);
        } else if (choice.equals("d")) {
            deleteSong(songList, scanner);
        } else {
                System.out.println("You pressed wrong button. Goodbye");
            }
        }

    private static void shuffle(ArrayList<String> songList) {
        ArrayList shuffledSongs = new ArrayList(songList);
        Collections.shuffle(shuffledSongs);
        for (Object song: shuffledSongs) {
            System.out.println(songList.indexOf(song)+ " " + song);}
    }

    private static void deleteSong(ArrayList<String> songList, Scanner scanner) {
        System.out.println("Which song would you like to delete: ");
        for (String song : songList) {
            System.out.println(songList.indexOf(song) + " " + song);
        }
        int songNumber = scanner.nextInt();
        songList.remove(songNumber);
        System.out.println("Would you like to play(p) or shuffle(s) remaining songs");
        String secondChoice = scanner.next();
        if (secondChoice.equals("s")) {
            ArrayList shuffledSongs = new ArrayList(songList);
            Collections.shuffle(shuffledSongs);
            for (Object song : shuffledSongs) {
                System.out.println(songList.indexOf(song) + " " + song);
            }

        } else if (secondChoice.equals("p")) {
            for (String song : songList) {
                System.out.println(songList.indexOf(song) + " " + song);
            }
        }
    }

    private static void addSong(Scanner scanner, ArrayList<String> songList) {
        System.out.println("Input your song: ");
        String string1 = scanner.nextLine();
        String newSong = scanner.nextLine();
        songList.add(newSong);
        for (String song: songList) {
        System.out.println(songList.indexOf(song)+ " " + song);
        }
    }

}