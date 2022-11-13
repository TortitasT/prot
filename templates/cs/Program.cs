class Program
{
  public static void Main(string[] args)
  {
    Console.WriteLine("Hello World!");

    Utility.Prompt<int>("Enter a number");
    Utility.PrintHeader("Header");
  }
}