using salesTrack.Domain.Enums;

namespace salesTrack.Domain.Models.JWT
{
    public class UserTokens
    {
       
            public string? Token
            {
                get;
                set;
            }
            public string? UserName
            {
                get;
                set;
            }
            public UserRole? UserRole
            {
                get;
                set;
            }
            public string? FullName
            {
                get;
                set;
            }
            public TimeSpan Validaty
            {
                get;
                set;
            }
            public string? RefreshToken
            {
                get;
                set;
            }
            public Guid? Id
            {
                get;
                set;
            }
            public string? EmailId
            {
                get;
                set;
            }
            
            public DateTime ExpiredTime
            {
                get;
                set;
            }
    }
}
