using salesTrack.Application.Abstraction.IEmailService;
using salesTrack.Application.Abstraction.Iidentity;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Application.Abstraction.IService;

namespace salesTrack.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IEmailHelperService emailHelperService;
        private readonly IContextService contextService;

        public UserService(IUserRepository userRepository,IEmailHelperService emailHelperService,IContextService contextService)
        {
            this.userRepository = userRepository;
            this.emailHelperService = emailHelperService;
            this.contextService = contextService;
        }


    }
}
