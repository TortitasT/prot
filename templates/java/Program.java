public class Program {
    public static void main(String[] args) throws Exception {
        Utility.PrintHeader("Welcome to the program!");

        String name = Utility.Prompt("What is your name?", String.class);
        int age = Utility.Prompt("What is your age?", Integer.class);

        // Print the user's name and age

            System.out.println("Hello " + name + ", you are " + age + " years old.");
    }
}






