using System.Data.Common;

namespace ShouTech.ERP.Api.Data;

public interface IDbConnectionFactory
{
    string ProviderName { get; }
    ValueTask<DbConnection> OpenConnectionAsync(CancellationToken cancellationToken = default);
    Task<bool> HasAuthenticationSchemaAsync(DbConnection connection);
    object ToIdentifier(string value);
    object BooleanParameter(bool value);
    bool IsTrue(object value);
    bool IsFalse(object value);
    object FormatTimestamp(DateTimeOffset value);
    object? FormatIpAddress(string? value);
}
