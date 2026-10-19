namespace ShouTech.ERP.Api.Security;

public interface IPasswordHasher
{
    string Hash(string password);
    bool Verify(string encodedHash, string password);
}
