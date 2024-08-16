using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Domain.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Services
{
    public class EmailHelperService : IEmailHelperService
    {
        private readonly IConfiguration configuration;

        public EmailHelperService(IConfiguration configuration
                                   )
        {
            this.configuration = configuration;
        }
        public Task<bool> SendEnquiryEmail(string emailAdrees)
        {
            throw new NotImplementedException();
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

    }
}
