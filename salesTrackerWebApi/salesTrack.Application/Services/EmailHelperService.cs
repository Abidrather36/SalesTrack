using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using MimeKit;
using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Domain.Models.Common;

namespace salesTrack.Application.Services
{
    public class EmailHelperService : IEmailHelperService
    {
        private readonly IConfiguration configuration;
        private readonly IHttpContextAccessor httpContextAccessor;

        public EmailHelperService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor
                                   )
        {
            this.configuration = configuration;
            this.httpContextAccessor = httpContextAccessor;
        }
        public async Task<bool> SendEnquiryEmail(string name, string phoneNumber, string emailAddress)
        {
            var subject = "New Enquiry Posted";
            var body = $"Hi Ram,<br /><br />" +
                       $"You have received a new enquiry. Here are the details:<br /><br />" +
                       $"<strong>Name:</strong> {name}<br />" +
                       $"<strong>Phone Number:</strong> {phoneNumber}<br />" +
                       $"<strong>Email:</strong> {emailAddress}<br /><br />" +
                       "Please check the admin panel for more details.<br /><br />" +
                       "Thanks,<br /><br />" +
                       "Team Antern Sales <br />"; 

            var emailMessage = CreateMailMessage("abidrather36@gmail.com", subject, body); 
            return await SendRegistrationEmail(emailMessage);
        }
        public async Task<bool> SendRegistrationEmail(MimeMessage emailMessage)
        {
            var emailParameters = new EmailParameters();
            emailParameters.SmtpHost = configuration.GetValue<string>("EmailSettings:SmtpHost");
            emailParameters.Port = configuration.GetValue<int>("EmailSettings:Port");
            emailParameters.UserName = configuration.GetValue<string>("EmailSettings:RegisterMail");
            emailParameters.Password = configuration.GetValue<string>("EmailSettings:RegisterMailPassword");

            var res = await Send(emailMessage, emailParameters);
            return res;
        }

        private async Task<bool> Send(MimeMessage email, EmailParameters emailParameters)
        {
            try
            {
                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect(emailParameters.SmtpHost, emailParameters.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(emailParameters.UserName, emailParameters.Password);
                await smtp.SendAsync(email);
                smtp.Disconnect(true);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public MimeMessage CreateMailMessage(string emailAddress, string Subject, string body)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(configuration.GetValue<string>("EmailSettings:From"));
            email.To.Add(MailboxAddress.Parse(emailAddress));
            email.Subject = Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = body;
            email.Body = builder.ToMessageBody();
            return email;
        }

        public async Task<bool> AddRegistrationEmail(string email, string password,string name)
        {
         
           
                var subject = "Successfully Registered";
                var body = $"Hi {name},<br /><br />" +
                           $"You are successfully registered.<br /><br />" +
                           $"Please find your login credentials below:<br /><br />" +
                           $"<strong>Email:</strong> {email}<br /><br />" +
                           $"<strong>Password:</strong> {password}<br /><br />" +
                           "Please check the admin panel for more details.<br /><br />" +
                           "Thanks, <br /><br/ >" +
                           "Team Antern Sales Track <br />";
                
                try
                {

                   var mailMessage= CreateMailMessage(email, subject, body);
                   return await SendRegistrationEmail(mailMessage);
                }
            catch (Exception ex)
                {
                throw;
                }
            }

        public async Task<bool> SendForgotPasswordEmail(string email, int resetCode)
        {
            var subject = "Reset Password";
            var link = $"http://localhost:4200/api/auth/Reset-Password?resetCode={resetCode}";
            var body = $"Hi,<br /><br />" +
                       $"We received a request to reset your password.<br /><br />" +
                       $"Please click on the below link to reset your password:<br /><br />" +
                       $"<a href='{link}' style='background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;'>Reset Password</a><br /><br />" +
                       "This code will expire in 5 minutes.<br /><br />" +
                       "Thanks, <br /><br/ >" +
                       "Team Antern Sales Track <br />";

            try
            {
                var mailMessage = CreateMailMessage(email, subject, body);
                return await SendRegistrationEmail(mailMessage);
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public string GetAppUrl()
        {
            var request = httpContextAccessor.HttpContext?.Request;
            return request?.Scheme + "//" + request?.Host + "/" + "api/";
           
        }
    }
}

