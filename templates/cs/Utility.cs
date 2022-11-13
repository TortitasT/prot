/// <summary>
/// Utility class with static methods
/// </summary>
static class Utility
{
  public const string Separator = "---------------";

  /// <summary>
  /// Writes a message to the console and returns the user's input
  /// </summary>
  /// <param name="message"></param>
  /// <typeparam name="Type"></typeparam>
  /// <returns></returns>
  public static Type Prompt<Type>(string message)
  {
    Console.WriteLine(message);

    Type result = (Type)Convert.ChangeType(Console.ReadLine(), typeof(Type))!;

    if (result == null)
    {
      throw new FormatException("Invalid input");
    }

    return result;
  }

  /// <summary>
  /// Prints a header in the console using the separator constant
  /// </summary>
  /// <param name="message"></param>
  public static void PrintHeader(string message)
  {
    Console.WriteLine(Separator);
    Console.WriteLine(message);
    Console.WriteLine(Separator);
  }
}