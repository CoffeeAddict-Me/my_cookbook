import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Application {
    public static void main(String[] args)  {
        try {
            File file = new File("myFile.txt");
            Scanner input = null;

                input = new Scanner(file);

            while (input.hasNextLine()) {
                String line = input.nextLine();
                System.out.println(line);
            }
            input.close();
           } catch (FileNotFoundException e) {
            System.out.println("Uh oh... File not found where it was supposed to be.");
//        throw new RuntimeException(e);
        }

        MyFileUtils myUtil = new MyFileUtils();
        try {
            System.out.println(myUtil.subtract10FromLargerNumber(9));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
