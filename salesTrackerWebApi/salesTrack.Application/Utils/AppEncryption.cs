using System.Security.Cryptography;
using System.Text;
namespace salesTrack.Application.Utils
{
    public class AppEncryption
    {
        public static string GenerateSalt()
        {/*
            RNGCryptoServiceProvider rng = new();*/
            byte[] salt=RandomNumberGenerator.GetBytes(32);
           /* byte[] salt = new byte[32];
            rng.GetBytes(salt);*/

          return   Convert.ToBase64String(salt);   
        }
        public static string CreatePasswordHash(string password ,string salt)
        {
            var saltedpassword= string.Concat(password,salt);
            HMACSHA256 sha = new();
             byte[] hash = sha.ComputeHash(Encoding.UTF8.GetBytes(saltedpassword));
            return Convert.ToBase64String(hash);

        }

        public static bool ComparePassword(string dbPassword ,string newPassword ,string dbSalt)
        {
            return dbPassword==CreatePasswordHash(newPassword,dbSalt);  
        }
    }
}
