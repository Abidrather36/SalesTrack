using Microsoft.EntityFrameworkCore;
using salesTrack.Application.Utils;
using salesTrack.Domain.Enums;
using SalesTrack.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Persistence.Data
{
   
        public static class ModelBuilderExtensions
        {
            public static void SeedUsers(this ModelBuilder modelBuilder)
            {
              var salt = AppEncryption.GenerateSalt();
            var dbPassword = AppEncryption.CreatePassword("ramrk@123", salt);
                modelBuilder.Entity<User>().HasData(new User
                {
                    Id = Guid.NewGuid(), 
                    Name = "Ram",
                    Email = "ramrk@anterntech.com",
                    ContactNo = "6545454543",
                    Address = "123 Main St hebbal",
                    PostalCode = "12345",
                    Password = dbPassword,
                    Salt = salt,
                    UserRole = UserRole.Admin,
                    ResetCode = 12345,
                    ResetExpiry = DateTimeOffset.UtcNow.AddMinutes(15),
                    IsPasswordTemporary = true
                });;

         
            }
        }

    }
