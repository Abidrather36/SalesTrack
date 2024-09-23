using System.Security.Cryptography;
using System.Text;
namespace salesTrack.Application.Utils
{
    public class AppEncryption
    {
        public static string GenerateSalt()
        {
            var randomNum = RandomNumberGenerator.GetBytes(16);
            return Convert.ToBase64String(randomNum);
        }
        public static string CreatePassword(string password, string salt)
        {
            var PasswordWithSalt = string.Concat(password, salt);
            var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(PasswordWithSalt!));
            return Convert.ToBase64String(bytes);
        }
        public static bool ComparePassword(string hashPassword, string password, string salt)
        {
            string hashedInputPassword = CreatePassword(password, salt);
            return hashPassword == hashedInputPassword;
        }

        public static string GetRandomConfirmationCode()
        {
            return RandomNumberGenerator.GetInt32(1111, 9999).ToString();
        }
        public static string GenerateRandomPassword(string email)
        {

            string emailName = email.Split('@')[0];

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            var randomString = new string(Enumerable.Repeat(chars, 6)
                                                    .Select(s => s[random.Next(s.Length)]).ToArray());

            return emailName + randomString.ToLower();
        }
    }
}
