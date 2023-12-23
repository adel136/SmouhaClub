using Microsoft.Extensions.Configuration;


public class SettingHelper
{
    public static string GetNewGUID()
    {
        return "MxH9vqLGqmR4noxgt7A3v2woggTe1TXa4GjxvFq50ENwjSPgKFwLHtlssssDyMVry4WODW5jTdHdJcLJ4utKWKdG89sAVfkMkSKQxingy0OBJoImF+mBU4G2m5sNLI4cdAKLEpfOfm5B2SOgC4KgKMWk8+YV5zuzg9YwwbAccSdif+jRXnjeJhQhDd+LAre8f1BzjqnGl1k1FAy8qqvz2cKuFuVF4r+++2kGkPJ";
    }
    private static IConfiguration GetConfig()
    {
        var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
        return builder.Build();
    }
    public static string GetConnectionString()
    {
        return GetConfig().GetSection("AppSettings:ConnectionString").Value;
    }
    public static string GetPublishName()
    {
        return GetConfig().GetSection("AppSettings:PublishName").Value;
    }

    public static string GetDefaultLang()
    {
        return GetConfig().GetSection("AppSettings:0002").Value;
    }

    public static string GetGoogleMapKey()
    {
        return GetConfig().GetSection("AppSettings:0003").Value;
    }
}

