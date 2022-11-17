import java.util.Scanner;

public class Utility {
    public static final String SEPARATOR = "----------------------------------------";

    /**
     * Prompts the user for input with a message.
     *
     * @param   message The message to display to the user.
     * @param   type    The type of input to expect.
     * @return          User input.
     */
    public static <T> T Prompt(String message, Class type) throws Exception {
        Scanner scanner = new Scanner(System.in);

        System.out.println(message);

        if (type == String.class) {
            return (T) scanner.nextLine();
        } else if (type == Integer.class) {
            return (T) Integer.valueOf(scanner.nextLine());
        } else if (type == Float.class) {
            return (T) Float.valueOf(scanner.nextLine());
        } else if (type == Double.class) {
            return (T) Double.valueOf(scanner.nextLine());
        } else {
            throw new Exception("Invalid type");
        }
    }

    /**
     * Prints a message to the console and wraps it in a separator.
     *
     * @param   message message to be printed
     */
    public static void PrintHeader(String message) {
        System.out.println(Utility.SEPARATOR);
        System.out.println(message);
        System.out.println(Utility.SEPARATOR);
    }
}
