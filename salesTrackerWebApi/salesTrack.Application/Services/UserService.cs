using salesTrack.Application.Utils;
using salesTrack.Domain.Models;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Application.Abstraction.IService;
using SalesTrack.Application.Common;
using SalesTrack.Application.Shared;
using SalesTrack.Domain.Entities;
using SalesTrack.Domain.Entities.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<ApiResponse<UserResponse>> Add(UserRequest model)
        { 
          
            User user = new()
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Email = model.Email,
                ContactNo = model.ContactNo,
                
            };
            int returnVal=await userRepository.InsertAsync(user);
            if (returnVal > 0)
                return ApiResponse<UserResponse>.SuccessResponse(new UserResponse
                {
                    Id=user.Id,
                    Name=model.Name,
                    Email=model.Email,
                    ContactNo=model.ContactNo,
                },ApiMessages.User.UserAddedSuccessfully);

            return ApiResponse<UserResponse>.ErrorResponse(ApiMessages.User.Error);
        }
    }
}
