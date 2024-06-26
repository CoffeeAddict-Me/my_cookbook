package learningfilereader;

import java.io.*;

public class NewApplication {
    public static void main(String[] args) {

        File file = new File("myFile.txt");

        try (
                FileReader fileReader = new FileReader(file);
                BufferedReader bufferedReader = new BufferedReader(fileReader);
                ) {
            String line = bufferedReader.readLine();

            while(line != null) {
                System.out.println(line);
                line = bufferedReader.readLine();
            }
        } catch (FileNotFoundException e) {
            System.out.println("File was not found");
        } catch (IOException e) {
            System.out.println("Problem reading the file: " + file.getName());

        }
    }

}
