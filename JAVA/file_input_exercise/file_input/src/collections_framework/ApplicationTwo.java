package collections_framework;

import java.util.ArrayList;

public class ApplicationTwo {
    public static void main(String[] args) {
        ArrayList<String> animals = new ArrayList<>();
        animals.add("lion");
        animals.add("cat");
        animals.add("doggo");
        animals.add("birb");

        for (int i = 0; i < animals.size(); i++) {
            System.out.println(animals.get(i));
        }
    }
}
