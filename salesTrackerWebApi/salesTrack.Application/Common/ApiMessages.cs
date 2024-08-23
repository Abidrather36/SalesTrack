namespace SalesTrack.Application.Shared;

public static  class ApiMessages
{


    // Common Errors
    public static readonly string TechnicalError = "There is some technical error, please try again later.";
    public static readonly string ProjectName = "Streamline Academies";
    public static readonly string AlreadyAvailable = "Email Already Registered";
    public static readonly string NotFound = "Not found.";
    public static readonly string InvaildStatusCode = "Invalid status code.";
    public static readonly string UpdatedSuccessfully = "Updated Successfully.";
    public static readonly string VerifyEmailLink = "api/auth/verifyemail";
    public static readonly string ValidationException = "Validation error";
    public static readonly string ForbiddenException = "Forbidden error";
    public static readonly string InfoOrAndConflictException = "Info/Conflict error";
    public static readonly string DbUpdateException = "Database Update Exception";
    public static readonly string ResetPasswordLink = "api/auth/resetpassword";
    public static readonly string Success = "Success.";
    public static readonly string Error = "Error.";
    public static readonly string InvaildAPIStatusCodes = "Invalid status code.";
    public static readonly string Admin = "Admin";
    public static readonly string EmailTemplates = "EmailTemplates";
    public static readonly string Templates = "D:\\Repository\\KashmirService\\API\\KashmirServices-Api\\KashmirService.Infrastructure\\EmailTemplates";
    public static readonly string ConfirmEmailSubject = "Verify Your Email And Complete Registration";
    public static readonly string PasswordResetEmailSubject = "Reset Your Password";
      public static class Auth
    {
        public const string NameAlreadyTaken = "Name is already taken.";
        public const string InvalidCredential = "invalid Credentials";
        public const string EmailAlreadyRegistered = "Email already registered.";
        public const string PhoneNumberAlreadyRegistered = "Phone Number already registered.";
        public const string EmailOrPasswordIsIncorrect = "Email or/and Password is Incorrect.";
        public const string PasswordChangedSuccess = "Password changed successfully.";
        public const string LinkExpired = "Email verification link has been expired, please try with diffrent Reset Code again.";
        public const string EmailVerified = "Email verified successfully, please try to login again.";
        public const string VerifyEmailError = "Please verify your email to login.";
        public const string InactiveUser = "Your account is temporarily inactive. Please contact the administrator for assistance.";
        public const string InVaildEmailAddress = "User not found, please enter a vaild email.";
        public const string CheckEmailToResetPassword = "Please check your email inbox for instructions on how to reset your password.";
        public const string PasswordResetSuccess = "Your password has been successfully reset. You can now log in using your new password.";
        public const string UserNotFound = "User not found";
        public const string IncorrectOldPassword = "Old Password is Incorrect";
        public const string LoggedIn = "Successfully logged in";
        public const string InValidResetCode = "Invalid Reset Code";

    }
    public static class User
    {
        /* public const string NameAlreadyTaken = "Name is already taken.";*/
        public const string UserAddedSuccessfully = "User Added Successfully";
        public static readonly string Error = "Error.";




    }
    public static class EnquiryManagement
    {
        public static readonly string EnquiryNotFound = "Enquiry not found.";
        public static readonly string EnquiryAdded = "Thanks for Contacting Us.We will reach you soon";
        public static readonly string EnquiryUpdated = "Enquiry Updated Successfully.";
        public static readonly string EnquiryDeleted = "Enquiry Deleted Successfully.";
        public static readonly string EnquiryNameExist = "Name already Exist.";
        public static readonly string EnquiryEmailExist = "Enquiry on this Email Already Registered.";
        public static readonly string InvalidCredential = "Invalid Credentials.";
        public static readonly string EnquiryFound = "One Enquiry Found.";

    }
    public static class ProcessManagement
    {
        public static readonly string ProcessNotFound = "Process not found.";
        public static readonly string ProcessAddedSuccessfully = "Process added successfully.";
        public static readonly string ProcessUpdateFailed = "Failed to update the process.";
        public static readonly string InvalidProcessData = "Invalid process data provided.";
        public static readonly string ProcessDeletedSuccessfully = "Process deleted successfully.";
        public static readonly string ProcessDeletionFailed = "Failed to delete the process.";
        public static readonly string DuplicateProcessName = "A process with this name already exists.";
        public static readonly string ProcessIdRequired = "Process ID is required.";
        public static readonly string UnauthorizedProcessAccess = "You do not have permission to access this process.";
        public static readonly string ProcessUpdateSuccess = "Process updated successfully.";
        public static readonly string ProcessListRetrievedSuccessfully = "Process list retrieved successfully.";
        public static readonly string ProcessFound = "Process found successfully.";
    }
    public static class LeadManagement
    {
        // General Lead Messages
        public static readonly string LeadNotFound = "Lead not found.";
        public static readonly string LeadAddedSuccessfully = "Lead added successfully.";
        public static readonly string LeadEmailExist = "Lead on this Email Already Registered.";
        public static readonly string LeadUpdateFailed = "Failed to update the lead.";
        public static readonly string InvalidLeadData = "Invalid lead data provided.";
        public static readonly string LeadDeletedSuccessfully = "Lead deleted successfully.";
        public static readonly string LeadDeletionFailed = "Failed to delete the lead.";
        public static readonly string DuplicateLeadEmail = "A lead with this email already exists.";
        public static readonly string LeadIdRequired = "Lead ID is required.";
        public static readonly string UnauthorizedLeadAccess = "You do not have permission to access this lead.";
        public static readonly string LeadUpdateSuccess = "Lead updated successfully.";
        public static readonly string LeadListRetrievedSuccessfully = "Lead list retrieved successfully.";
        public static readonly string LeadFound = "Lead found successfully.";

        // Follow-Up Messages
        public static readonly string FollowUpAddedSuccessfully = "Follow-up added successfully.";
        public static readonly string FollowUpUpdateFailed = "Failed to update the follow-up.";
        public static readonly string FollowUpHistoryLoaded = "Follow-up history loaded successfully.";
        public static readonly string FollowUpNotFound = "Follow-up not found.";

        // Process Steps Messages
        public static readonly string ProcessStepsAddedSuccessfully = "Process steps added successfully.";
        public static readonly string ProcessStepsUpdateFailed = "Failed to update the process steps.";
        public static readonly string ProcessStepsNotFound = "Process steps not found.";
    }





}
