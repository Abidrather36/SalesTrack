using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Application.Abstraction.IService;
using SalesTrack.Application.Common;
using SalesTrack.Domain.Entities;
using SalesTrack.Domain.Entities.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SalesTrack.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository repository;

        public UserService(IUserRepository repository)
        {
            this.repository = repository;
        }
        public async Task<ApiResponse<UserResponse>> Add(UserRequest model)
        {
            User user = new()
            {
                Id = Guid.NewGuid(),
                UserName = model.UserName,
                Email = model.Email,

            };
           int retval =await repository.InsertAsync(user);
            if (retval > 0)
                return ApiResponse<UserResponse>.SuccessResponse(new UserResponse { ContactNo=user.ContactNo,UserName=user.UserName},"user Added ");

            return default;
        }
    }
}
