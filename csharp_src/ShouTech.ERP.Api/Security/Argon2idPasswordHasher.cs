using System.Security.Cryptography;
using Konscious.Security.Cryptography;

namespace ShouTech.ERP.Api.Security;

public sealed class Argon2idPasswordHasher : IPasswordHasher
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int MemorySizeKiB = 65536;
    private const int Iterations = 3;
    private const int Parallelism = 2;

    public string Hash(string password)
    {
        ArgumentException.ThrowIfNullOrEmpty(password);
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var hash = Derive(password, salt, MemorySizeKiB, Iterations, Parallelism, HashSize);
        return $"argon2id$v=19$m={MemorySizeKiB},t={Iterations},p={Parallelism}${Convert.ToBase64String(salt)}${Convert.ToBase64String(hash)}";
    }

    public bool Verify(string encodedHash, string password)
    {
        if (string.IsNullOrEmpty(encodedHash) || string.IsNullOrEmpty(password)) return false;
        try
        {
            var parts = encodedHash.Split('$');
            if (parts.Length != 5 || parts[0] != "argon2id" || parts[1] != "v=19") return false;
            var parameters = parts[2].Split(',').Select(x => x.Split('=')).ToDictionary(x => x[0], x => int.Parse(x[1]));
            var memory = parameters["m"];
            var iterations = parameters["t"];
            var parallelism = parameters["p"];
            if (memory is < 8192 or > 262144 || iterations is < 1 or > 10 || parallelism is < 1 or > 8) return false;
            var salt = Convert.FromBase64String(parts[3]);
            var expected = Convert.FromBase64String(parts[4]);
            if (salt.Length is < 16 or > 64 || expected.Length is < 16 or > 64) return false;
            var actual = Derive(password, salt, memory, iterations, parallelism, expected.Length);
            return CryptographicOperations.FixedTimeEquals(actual, expected);
        }
        catch (FormatException) { return false; }
        catch (ArgumentException) { return false; }
        catch (KeyNotFoundException) { return false; }
    }

    private static byte[] Derive(string password, byte[] salt, int memory, int iterations, int parallelism, int outputSize)
    {
        using var argon2 = new Argon2id(System.Text.Encoding.UTF8.GetBytes(password))
        {
            Salt = salt, DegreeOfParallelism = parallelism, MemorySize = memory, Iterations = iterations
        };
        return argon2.GetBytes(outputSize);
    }
}
