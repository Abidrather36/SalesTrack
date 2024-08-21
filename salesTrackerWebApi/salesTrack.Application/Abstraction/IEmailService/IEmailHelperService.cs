namespace salesTrack.Application.Abstraction.IEmailService
{
    public interface IEmailHelperService
    {
        Task<bool> SendEnquiryEmail(string name, string phoneNumber, string emailAddress);
        Task<bool> AddRegistrationEmail(string email,string password,string name);

    }
}
