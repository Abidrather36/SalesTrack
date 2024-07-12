namespace SalesTrack.Domain.Entities.Models.Request
{
    public class UserRequest
    {
        public int UserName { get; set; }

        public string Email { get; set; }


        public string ContactNo { get; set; }
    }
    public class UserResponse:UserRequest
    {

    }
}
